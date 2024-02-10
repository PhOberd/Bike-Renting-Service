import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private ticketsUrl = 'http://localhost:3000/booking-tickets';

  constructor(private http: HttpClient) { }

  getTickets(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(this.ticketsUrl, { headers });
  }

  postTicket(token: string, ticket: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.post<any>(this.ticketsUrl, { ticket }, { headers });
  }
}
