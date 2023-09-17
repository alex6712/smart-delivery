import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/api/auth.service';
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

  constructor(private auth: AuthService, private store$: Store<AuthStore>) {}

  ngOnInit(): void {}

  setPath(path: Path) {
    console.log(path);
    if (path.deliveryMethod == 'auto') {
      this.stations = path;
    } else {
    }
  }

  refresh() {
    this.auth.refresh(this.store$);
  }
}
