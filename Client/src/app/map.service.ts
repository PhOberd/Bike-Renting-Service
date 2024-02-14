import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private stationsUrl = 'http://localhost:3000/stations';

  constructor(private http: HttpClient) { }

  getStations(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(this.stationsUrl, { headers });
  }
}
