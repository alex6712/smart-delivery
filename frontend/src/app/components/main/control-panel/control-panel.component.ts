import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { stat } from 'fs';

declare const ymaps: any;

interface Stations {
  firstStation: string;
  firstStationCoords?: number[];
  lastStation: string;
  lastStationCoords?: number[];
  deliveryMethod: string;
}

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss', '../main.styles.scss'],
})
export class ControlPanelComponent implements OnInit {
  private readonly API_KEY = 'a9c75f00-b00f-4462-b0fe-9fbfacd16a88';

  public map: any;
  public geolocation: any;
  public objects: any;
  public circle: any;
  public routePanelControl: any;
  public myLine: any;
  public zoomControl: any;

  private DELIVERY_TARIFF_AUTO: number = 20; // руб за км
  private MINIMUM_COST: number = 500; // руб. минимальная доставка

  PATH: any = 0;
  DAYS: any = 0;
  HOURS: any = 0;
  PRICE: any = 0;

  @Input()
  stations: Stations;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log(this.stations);
    if (this.stations) {
      // if ()
      const arr = [this.stations.firstStation, this.stations.lastStation];
      let first: boolean = false;
      arr.forEach((el: string) => {
        this.http
          .get(
            'https://geocode-maps.yandex.ru/1.x/?apikey=' +
              this.API_KEY +
              '&geocode=' +
              encodeURIComponent(el) +
              '&format=json'
          )
          .subscribe((res: any) => {
            if (!first) {
              this.stations.firstStationCoords =
                res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
                  .split(' ')
                  .reverse()
                  .map((el: string) => Number(el));
              first = true;
            } else {
              this.stations.lastStationCoords =
                res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
                  .split(' ')
                  .reverse()
                  .map((el: string) => Number(el));
            }
            console.log(this.stations.firstStationCoords);
          });
      });
      console.log(this.firstStationCoords);
      this.initMap();
    }
  }

  get firstStationCoords() {
    return this.stations.firstStationCoords;
  }

  async initLineMap() {
    await ymaps.ready().then(() => {
      this.map = new ymaps.Map(
        'map',
        {
          center: [56.283, 44.035],
          zoom: 12,
        },
        {
          autoFitToViewport: 'always',
          searchControlProvider: 'yandex#search',
        }
      );

      const myLine = new ymaps.GeoObject(
        {
          geometry: {
            type: 'LineString',
            coordinates: [
              this.firstStationCoords,
              this.stations.lastStationCoords,
            ],
          },
          properties: {
            balloonContent: 'qwe',
          },
        },
        {
          strokeWidth: 10,
          strokeColor: '#FF0000',
        }
      );
      this.map.geoObjects.add(myLine);
      this.map.setBounds(myLine.geometry.getBounds());
      console.log(myLine.getParent());
    });
  }

  async initMap() {
    await ymaps.ready().then(() => {
      (this.geolocation = ymaps.geolocation),
        (this.routePanelControl = new ymaps.control.RoutePanel({
          options: {
            showHeader: true,
            title: 'Расчёт доставки',
          },
        })),
        (this.zoomControl = new ymaps.control.ZoomControl({
          options: {
            size: 'small',
            float: 'none',
            position: {
              bottom: 145,
              right: 10,
            },
          },
        }));

      this.routePanelControl.routePanel.options.set({
        types: { auto: true },
      });

      this.routePanelControl.routePanel.state.set({
        from: this.stations.firstStation,
        to: this.stations.lastStation,
      });

      let date: number = 0;
      this.routePanelControl.routePanel.getRouteAsync().then((route: any) => {
        // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
        route.model.setParams({ results: 1 }, true);

        // Повесим обработчик на событие построения маршрута.
        route.model.events.add('requestsuccess', () => {
          const activeRoute = route.getActiveRoute();
          if (activeRoute) {
            //   activeRoute.model.properties._data.rawProperties.boundedBy.map((point: any[]) => point.reverse())

            // Получим протяженность маршрута.
            this.PATH = route.getActiveRoute().properties.get('distance');
            // Вычислим стоимость доставки.
            this.DAYS = Math.ceil(this.PATH.value / 1000 / 90 / 16);
            (this.PRICE = this.calculate(Math.round(this.PATH.value / 1000))),
              (this.HOURS = Math.ceil(this.PATH.value / 1000 / 90));
            /*
            ВЫЧИСЛЯТЬ ДЛИТЕЛЬНОСТЬ ПУТИ ПО РАСЧЕТУ РАССТОЯНИЕ / 90КМЧ
            + В СУТКИ ОКОЛО 12-18 ЧАСОВ ЕЗДЫ
            */
            // Создадим макет содержимого балуна маршрута.
            const balloonContentLayout =
              ymaps.templateLayoutFactory.createClass(
                '<span>Расстояние: ' +
                  this.PATH.text +
                  '.</span><br/> <span>Время: </span>' +
                  (this.HOURS > 16 ? date + ' дн.' : this.HOURS + ' ч.') +
                  '<br/><span style="font-weight: bold; font-style: italic">Стоимость доставки: ' +
                  this.PRICE +
                  ' р.</span>'
              );
            // Зададим этот макет для содержимого балуна.
            route.options.set(
              'routeBalloonContentLayout',
              balloonContentLayout
            );
            // Откроем балун.
            activeRoute.balloon.open();
          }
        });
      });

      this.map = new ymaps.Map(
        'map',
        {
          center: [56.283, 44.035],
          zoom: 12,
        },
        {
          autoFitToViewport: 'always',
          searchControlProvider: 'yandex#search',
        }
      );

      this.map.controls.add(this.routePanelControl).add(this.zoomControl);
    });
  }

  calculate(routeLength: number) {
    return Math.max(routeLength * this.DELIVERY_TARIFF_AUTO, this.MINIMUM_COST);
  }
}
