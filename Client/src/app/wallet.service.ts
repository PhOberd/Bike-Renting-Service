import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private walletUrl = 'http://localhost:3000/wallet';

  constructor(private http: HttpClient) { }

  getBalance(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(this.walletUrl, { headers });
  }

  getBalanceById(token: string, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(`${this.walletUrl}/${userId}`, { headers });
  }

  chargeBalance(token: string, amount: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.post<any>(`${this.walletUrl}/charge`, { amount }, { headers });
  }

  useBalance(token: string, amount: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.post<any>(`${this.walletUrl}/use`, { amount }, { headers });
  }

  resetBalanceById(token: string, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.patch<any>(`${this.walletUrl}/${userId}/reset`, {}, { headers });
  }
}
