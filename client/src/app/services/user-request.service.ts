import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {
  
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): {headers: HttpHeaders} {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getLoggedInUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, this.getAuthHeaders());
  }

}
