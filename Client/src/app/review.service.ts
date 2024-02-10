import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseBikesUrl = 'http://localhost:3000/stations/';

  constructor(private http: HttpClient) { }

  getRatio(token: string, stationId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(`${this.baseBikesUrl}${stationId}/reviews`, { headers }).pipe(
      map(numbers => {
        let sum = 0;
        if (numbers && numbers.length > 0) {
          for (let i = 0; i < numbers.length; i++) {
            sum += numbers[i].rating;
          }
          return Math.round(sum / numbers.length);
        } else {
          return 0;
        }
      })
    );
  }
}
