import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getRatio(token: string, stationId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(`${this.baseUrl}stations/${stationId}/reviews`, { headers }).pipe(
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

  postReview(token: string, user_id: number, model_id: number, station_id: number, reviewText: string, rating: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    const body = {
      user_id: user_id,
      model_id: model_id,
      station_id: station_id,
      reviewText: reviewText,
      rating: rating
    };

    return this.http.post<any>(`${this.baseUrl}tickets/reviews`, body, { headers });
  }
}
