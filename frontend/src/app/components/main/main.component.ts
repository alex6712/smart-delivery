import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/api/auth.service';
import { MapService } from 'src/app/api/map.service';
import { RailWayAnswer } from 'src/app/models/map/railway.model';
import { AuthStore } from 'src/app/store/auth/auth.reducer';
import { DelivMethod } from './stations/stations.component';

export interface Path {
  firstStation: string;
  lastStation: string;
  deliveryMethod: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  stations: Path;
  cost: number;
  distance: number;

  constructor(
    private auth: AuthService,
    private map: MapService,
    private store$: Store<AuthStore>
  ) {}

  ngOnInit(): void {}

  setPath(path: Path) {
    console.log(path);
    this.stations = path;
    if (path.deliveryMethod === 'trailway') {
      this.map
        .uploadTrailWayStations({
          departure_station_code: Number(path.firstStation),
          destination_station_code: Number(path.lastStation),
        })
        .subscribe((res: RailWayAnswer) => {
          this.cost = res.cost;
          this.distance = res.distance;
        });
    }
  }

  refresh() {
    this.auth.refresh(this.store$);
  }
}
