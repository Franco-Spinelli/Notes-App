import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = 'http://localhost:8092/challenge';
  constructor(private http: HttpClient) { }
  getNotes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/note/findAll`);
  }
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/findAll`);
  }
}
