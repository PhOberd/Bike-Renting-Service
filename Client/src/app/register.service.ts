import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerUrl = 'http://localhost:3000/register';

  constructor(private http: HttpClient) { }

  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.registerUrl, { email, password });
  }
}
