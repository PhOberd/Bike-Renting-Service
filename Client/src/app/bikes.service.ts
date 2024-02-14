import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BikesService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getBikesByStationId(token: string, stationId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(`${this.baseUrl}stations/${stationId}/free-bikes`, { headers });
  }

  getBikeById(token: string, bikeId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(`${this.baseUrl}bikes/${bikeId}`, { headers });
  }

  getBikes(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(`${this.baseUrl}bikes`, { headers });
  }

  changeBikeStatus(token: string, bikeId: string, status: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.patch<any>(`${this.baseUrl}bikes/${bikeId}/status`, { status }, { headers });
  }

  postBike(token: string, formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.post<any>(`${this.baseUrl}bikes`, formData, { headers });
  }

  deleteBike(token: string, bikeId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.delete<any>(`${this.baseUrl}bikes/${bikeId}`, { headers });
  }

  changeBike(token: string, formData: any, bikeId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.put<any>(`${this.baseUrl}bikes/${bikeId}`, formData, { headers });
  }
}
