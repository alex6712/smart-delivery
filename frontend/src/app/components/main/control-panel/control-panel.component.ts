import { Component, OnInit } from '@angular/core';

declare const ymaps: any;

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss', '../main.styles.scss'],
})
export class ControlPanelComponent implements OnInit {
  public map: any;
  public geolocation: any;
  public objects: any;
  public circle: any;
  public routePanelControl: any;
  public zoomControl: any;
  private DELIVERY_TARIFF_AUTO: number = 20;
  private MINIMUM_COST: number = 500;

  constructor() {}

  ngOnInit(): void {
    ymaps.ready().then(() => {
      (this.geolocation = ymaps.geolocation),
        (this.map = new ymaps.Map(
          'map',
          {
            center: [56.283, 44.035],
            zoom: 12,
          },
          {
            autoFitToViewport: 'always',
            searchControlProvider: 'yandex#search',
          }
        )),
        (this.routePanelControl = new ymaps.control.RoutePanel({
          options: {
            // Добавим заголовок панели.
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

      console.log(ymaps.route.getPaths());

      this.routePanelControl.routePanel.options.set({
        types: { auto: true },
      });
      this.map.controls.add(this.routePanelControl).add(this.zoomControl);

      this.routePanelControl.routePanel.getRouteAsync().then((route: any) => {
        // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
        route.model.setParams({ results: 1 }, true);

        // Повесим обработчик на событие построения маршрута.
        route.model.events.add('requestsuccess', () => {
          const activeRoute = route.getActiveRoute();
          if (activeRoute) {
            // Получим протяженность маршрута.
            const length = route.getActiveRoute().properties.get('distance'),
              // Вычислим стоимость доставки.
              price = this.calculate(Math.round(length.value / 1000)),
              /*
               ВЫЧИСЛЯТЬ ДЛИТЕЛЬНОСТЬ ПУТИ ПО РАСЧЕТУ РАССТОЯНИЕ / 90КМЧ
               + В СУТКИ ОКОЛО 12-18 ЧАСОВ ЕЗДЫ
              */
              // Создадим макет содержимого балуна маршрута.
              balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<span>Расстояние: ' +
                  length.text +
                  '.</span><br/>' +
                  '<span style="font-weight: bold; font-style: italic">Стоимость доставки: ' +
                  price +
                  ' р.</span>'
              );
            // Зададим этот макет для содержимого балуна.
            route.options.set(
              'routeBalloonContentLayout',
              balloonContentLayout
            );
            // Откроем балун.
            activeRoute.balloon.open();
            console.log(ymaps.route.getPaths());
          }
        });
      });

      // Сравним положение, вычисленное по ip пользователя и
      // положение, вычисленное средствами браузера.
      this.geolocation
        .get({
          provider: 'yandex',
          mapStateAutoApply: true,
        })
        .then((result: any) => {
          // Красным цветом пометим положение, вычисленное через ip.
          result.geoObjects.options.set('preset', 'islands#redCircleIcon');
          result.geoObjects.get(0).properties.set({
            balloonContentBody: 'Мое местоположение',
          });
          this.map.geoObjects.add(result.geoObjects);
        });

      this.geolocation
        .get({
          provider: 'browser',
          mapStateAutoApply: true,
        })
        .then((result: any) => {
          // Синим цветом пометим положение, полученное через браузер.
          // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
          result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
          this.map.geoObjects.add(result.geoObjects);
        });

      //
      //
      //
      //
      //
      //
      //
      //
    });
  }

  calculate(routeLength: number) {
    return Math.max(routeLength * this.DELIVERY_TARIFF_AUTO, this.MINIMUM_COST);
  }
}
