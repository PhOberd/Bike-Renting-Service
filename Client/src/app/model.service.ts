import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getModels(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(`${this.baseUrl}models`, { headers });
  }

  getModelById(token: string, modelId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(`${this.baseUrl}models/${modelId}`, { headers });
  }
  
  postModels(token: string, formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.post<any>(`${this.baseUrl}models`, formData, { headers });
  }

  changeModel(token: string, formData: any, modelId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.put<any>(`${this.baseUrl}models/${modelId}`, formData, { headers });
  }

  deleteModel(token: string, modelId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': token
    });

    return this.http.delete<any>(`${this.baseUrl}models/${modelId}`, { headers });
  }
}
