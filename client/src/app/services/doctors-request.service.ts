import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Response } from '../types/response';
import { Doctors } from '../types/doctors';
import { Users } from '../types/users';
@Injectable({
  providedIn: 'root'
})
export class DoctorsRequestService {

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctors[]> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2FiNDU3NmI3MTFmYjE2NzgyYTUzZCIsImlhdCI6MTc1ODEzNzY0OCwiZXhwIjoxNzU4MjI0MDQ4fQ.mTQkCpjW6aXC6uGGMLOabefHrFHXWoz1LmTOcjq6ZO8';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Doctors[]>('http://localhost:3000/api/admin/doctors', { headers });
  }

  getDoctorById(doctorId: any): Observable<Doctors> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2FiNDU3NmI3MTFmYjE2NzgyYTUzZCIsImlhdCI6MTc1ODEzNzY0OCwiZXhwIjoxNzU4MjI0MDQ4fQ.mTQkCpjW6aXC6uGGMLOabefHrFHXWoz1LmTOcjq6ZO8';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Doctors>(`http://localhost:3000/api/admin/doctors/${doctorId}`, { headers });

  }

  getUsers(): Observable<Users[]> {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2FiNDU3NmI3MTFmYjE2NzgyYTUzZCIsImlhdCI6MTc1ODEzNzY0OCwiZXhwIjoxNzU4MjI0MDQ4fQ.mTQkCpjW6aXC6uGGMLOabefHrFHXWoz1LmTOcjq6ZO8';
    const headers = new HttpHeaders({ 'Authorization': token });
    return this.http.get<Users[]>('http://localhost:3000/api/users', { headers });
  }

}
