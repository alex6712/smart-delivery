import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as AuthResponse from '../models/auth/auhtResponse.model';
import * as AuthForm from '../models/auth/authForm.model';
import { ResponseItems } from '../models/response.model';
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
}
