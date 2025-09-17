import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../types/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentRequestService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2FiNDEwNmI3MTFmYjE2NzgyYTUzNyIsImlhdCI6MTc1ODE0NjIxMSwiZXhwIjoxNzU4MjMyNjExfQ.8oW7KrTw-NSDFXoi_tnCJiZGuoRB6MOEnY2pnfQF0cI'; 
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getAppointments(): Observable<Appointment[]> {

    return this.http.get<Appointment[]>(`${this.apiUrl}/users/my-appointments`, this.getAuthHeaders());
  }

  addAppointment(data: Appointment): Observable<any> {
    return this.http.post(`${this.apiUrl}/patients`, data, this.getAuthHeaders());
  }

  updateAppointment(id: string, data: Appointment): Observable<any> {
    return this.http.patch(`${this.apiUrl}/patients/${id}`, data, this.getAuthHeaders());
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/users/${id}`, this.getAuthHeaders());
  }
}
