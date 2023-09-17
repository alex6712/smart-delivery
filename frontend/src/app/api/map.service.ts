import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Path } from '../components/main/main.component';
import * as API from './url.const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  //   uploadTrailWayStations(
  //    stationForm: Path
  //   ): Observable<> {

  //   }

  //   login(
  //    loginform: URLSearchParams
  //  ): Observable<ResponseItems<AuthResponse.LoginResponse>> {
  //    return new Observable((observer) => {
  //      this.http
  //        .post<ResponseItems<AuthResponse.LoginResponse>>(
  //          API.SIGNIN_URL,
  //          loginform,
  //          {
  //            headers: new HttpHeaders().set(
  //              'content-type',
  //              'application/x-www-form-urlencoded'
  //            ),
  //          }
  //        )
  //        .subscribe((res: ResponseItems<AuthResponse.LoginResponse>) => {
  //          observer.next(res);
  //        });
  //    });
  //  }
}
