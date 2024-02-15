import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getTickets(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(`${this.baseUrl}booking-tickets`, { headers });
  }

  getOverdueTickets(token: string): Observable<any[]> {
    const currentTime = new Date().getTime();
    return this.getTickets(token).pipe(
      map((tickets: any[]) => tickets.filter(ticket => ticket.status === 'Active'
      && currentTime > new Date(ticket.end_time).getTime()))
    );
  }

  postTicket(token: string, ticket: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.post<any>(`${this.baseUrl}booking-tickets`, { ticket }, { headers });
  }

  changeTicketStatus(token: string, ticketId: any, status: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.patch<any>(`${this.baseUrl}booking-tickets/${ticketId}/status`, { status }, { headers });
  }
}
