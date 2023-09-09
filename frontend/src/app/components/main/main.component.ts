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
  stations: any[] = [];

  constructor(private auth: AuthService, private store$: Store<AuthStore>) {}

  ngOnInit(): void {}

  setPath(path: Path) {
    console.log(1, path);
  }

  refresh() {
    this.auth.refresh(this.store$);
  }
}
