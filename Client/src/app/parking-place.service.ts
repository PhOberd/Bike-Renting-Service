import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingPlaceService {
  private baseUrl = 'http://localhost:3000/parking-places';

  constructor(private http: HttpClient) { }

  getFreeParkingPlaces(token: string, categoryId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.get<any>(`${this.baseUrl}/${categoryId}/free`, { headers });
  }

  getParkingPlaces(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.get<any>(`${this.baseUrl}`, { headers });
  }

  getParkingPlacesByStationId(token: string, stationId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.get<any>(`${this.baseUrl}/${stationId}`, { headers });
  }

  deleteParkingPlace(token: string, placeId: string){
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.delete<any>(`${this.baseUrl}/${placeId}`, { headers });
  }

  postParkingPlace(token: string, stationId: string, formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.post<any>(`${this.baseUrl}/${stationId}`, formData, { headers });
  }

  emptyParkingPlaceByBikeId(token: string, bike_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.patch<any>(`${this.baseUrl}/${bike_id}/empty`, {}, { headers });
  }

  assignParkingPlaceByBikeId(token: string, bike_id: number, parkingPlace: number, station_id: number){
    const headers = new HttpHeaders({
      'Authorization': token
    });
    
    const body = {
      parkingPlace: parkingPlace,
      station_id: station_id
    }

    return this.http.patch<any>(`${this.baseUrl}/${bike_id}/assign`, {parkingPlace, station_id}, { headers });
  }
}
