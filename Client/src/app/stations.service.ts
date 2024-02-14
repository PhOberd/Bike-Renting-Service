import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  postStation(token: string, formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.post<any>(`${this.baseUrl}stations`, formData, { headers });
  }

  getStationById(token: string, stationId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.get<any>(`${this.baseUrl}stations/${stationId}`, { headers });
  }

  changeStation(token: string, formData: any, stationId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.put<any>(`${this.baseUrl}stations/${stationId}`, formData, { headers });
  }
}
