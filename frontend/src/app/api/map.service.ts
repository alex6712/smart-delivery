import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Path } from '../components/main/main.component';
import * as RailAPI from '../models/map/railway.model';
import { ResponseItems } from '../models/response.model';
import * as API from './url.const';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  uploadTrailWayStations(
    stationForm: RailAPI.RailWay
  ): Observable<RailAPI.RailWayAnswer> {
    return new Observable((observer) => {
      this.http
        .get<RailAPI.RailWayAnswer>(
          API.UPLOAD_STATION_FORM +
            '?departure_station_code=' +
            stationForm.departure_station_code +
            '&destination_station_code=' +
            stationForm.destination_station_code,
          {
            headers: new HttpHeaders().set(
              'content-type',
              'application/x-www-form-urlencoded'
            ),
          }
        )
        .subscribe((res: RailAPI.RailWayAnswer) => {
          observer.next(res);
        });
    });
  }
}
