import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getCategories(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(`${this.baseUrl}categories`, { headers });
  }

  getCategoriesById(token: string, categoryId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(`${this.baseUrl}categories/${categoryId}`, { headers });
  }

  postCategory(token: string, formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.post<any>(`${this.baseUrl}categories`, formData, { headers });
  }

  changeCategory(token: string, formData: any, categoryId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.put<any>(`${this.baseUrl}categories/${categoryId}`, formData, { headers });
  }
}
