import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthResponse from '../models/auth/auhtResponse.model';
import * as AuthForm from '../models/auth/authForm.model';
import { ResponseItem, ResponseItems } from '../models/response.model';
import { AuthTokensSaveAction } from '../store/auth/auth.actions';
import { AuthStore } from '../store/auth/auth.reducer';
import { authGetRefreshSelector } from '../store/auth/auth.selectors';
import * as API from './url.const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  test() {
    console.log('inner');
    this.http.get(API.FUNCTIONALY_CHECK_URL).subscribe((res) => {
      console.log(res);
    });
  }

  login(
    loginform: URLSearchParams
  ): Observable<ResponseItems<AuthResponse.LoginResponse>> {
    return new Observable((observer) => {
      this.http
        .post<ResponseItems<AuthResponse.LoginResponse>>(
          API.SIGNIN_URL,
          loginform,
          {
            headers: new HttpHeaders().set(
              'content-type',
              'application/x-www-form-urlencoded'
            ),
          }
        )
        .subscribe((res: ResponseItems<AuthResponse.LoginResponse>) => {
          observer.next(res);
        });
    });
  }

  registration(
    regform: AuthForm.RegForm
  ): Observable<ResponseItems<AuthResponse.RegResponse>> {
    return new Observable((observer) => {
      this.http
        .post<ResponseItems<AuthResponse.RegResponse>>(API.SIGNUP_URL, regform)
        .subscribe((res: ResponseItems<AuthResponse.RegResponse>) => {
          observer.next(res);
        });
    });
  }

  getMe(access: string): Observable<AuthResponse.MeResponse> {
    return new Observable((observer) => {
      this.http
        .get<AuthResponse.MeResponse>(API.ME_URL, {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + access),
        })
        .subscribe((res) => {
          observer.next(res);
        });
    });
  }

  refresh(store$: Store<AuthStore>) {
    const refresh = localStorage.getItem('refresh_token');
    let refreshInStore = '';
    store$
      .pipe(select(authGetRefreshSelector))
      .subscribe((res) => (refreshInStore = res));

    if (refresh && refresh == refreshInStore)
      this.refreshToken(refresh).subscribe((res) => {
        console.log(res);
        if (res.code == 200) {
          if (res.access_token && res.refresh_token) {
            store$.dispatch(
              new AuthTokensSaveAction({
                access_token: res.access_token,
                refresh_token: res.refresh_token,
                isAuth: true,
              })
            );
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('refresh_token', res.refresh_token);
            localStorage.setItem('isAuth', JSON.stringify(true));
          }
        }
      });
  }

  refreshToken(refresh_token: string): Observable<ResponseItem> {
    return new Observable((observer) => {
      this.http
        .get<ResponseItem>(API.REFRESH_URL, {
          headers: new HttpHeaders().set(
            'Authorization',
            'Bearer ' + refresh_token
          ),
        })
        .subscribe((res) => {
          observer.next(res);
        });
    });
  }
}
