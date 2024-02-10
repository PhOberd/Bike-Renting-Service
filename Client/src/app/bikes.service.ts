import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BikesService {
  private baseBikesUrl = 'http://localhost:3000/stations/';

  constructor(private http: HttpClient) { }

  getBikes(token: string, stationId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(`${this.baseBikesUrl}${stationId}/bike`, { headers });
  }
}
