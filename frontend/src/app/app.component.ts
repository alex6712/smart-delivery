import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthTokensSaveAction } from './store/auth/auth.actions';
import { AuthStore } from './store/auth/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'threeCoursePractic';
  access: string | null = null;
  refresh: string | null = null;
  isAuth: boolean | null = null;

  constructor(private store$: Store<AuthStore>) {}

  ngOnInit(): void {
    this.access = localStorage.getItem('access_token');
    this.refresh = localStorage.getItem('refresh_token');
    const auth = localStorage.getItem('isAuth');
    if (auth) this.isAuth = JSON.parse(auth);

    if (this.access && this.refresh && this.isAuth)
      this.store$.dispatch(
        new AuthTokensSaveAction({
          access_token: this.access,
          refresh_token: this.refresh,
          isAuth: this.isAuth,
        })
      );
  }
}
