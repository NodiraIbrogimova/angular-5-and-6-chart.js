import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private _apiUrl = 'api/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22';
  constructor(private _http: HttpClient) { }

  dailyForecast() {
    return this._http.get(this._apiUrl).pipe(map(result => result));
  }
}
