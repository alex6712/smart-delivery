import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/api/auth.service';
import { AuthStore } from 'src/app/store/auth/auth.reducer';

export interface Path {
  firstStation: string;
  lastStation: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  stations: { firstStation: string; lastStation: string };

  constructor(private auth: AuthService, private store$: Store<AuthStore>) {}

  ngOnInit(): void {}

  setPath(path: { firstStation: string; lastStation: string }) {
    this.stations = path;
    this.uploadPath(this.stations);
  }

  uploadPath(path: { firstStation: string; lastStation: string }) {
    return path;
  }

  refresh() {
    this.auth.refresh(this.store$);
  }
}
