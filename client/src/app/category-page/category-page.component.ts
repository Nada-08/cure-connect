import { Component, OnInit } from '@angular/core';
import { Doctors } from '../types/doctors';
import { DoctorsRequestService } from '../services/doctors-request.service';
import { forkJoin } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, KeyValuePipe } from '@angular/common';
@Component({
  selector: 'app-category-page',
  imports: [RouterLink,CommonModule, KeyValuePipe, RouterOutlet],
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  doctors?: Doctors[];
  loading: boolean = true;
  error: string = '';
  users: any;
  CategoresDoctors: { [specialization: string]: Doctors[] } = {};
  constructor(private doctorsRequest: DoctorsRequestService) { }

  ngOnInit() {
    forkJoin({
      doctors: this.doctorsRequest.getDoctors(),
      users: this.doctorsRequest.getUsers()
    }).subscribe({
      next: ({ doctors, users }) => {
        this.doctors = doctors.map(doctor => {
          const user = users.find(u => u._id === doctor.userId);
          // console.log(user);
          // console.log(user?.avatar);
          console.log(`http://localhost:3000/uploads/${user?.avatar}`);
          return {
            ...doctor,
            name: user?.name || 'Unknown',
            avatar: user?.avatar
              ? `http://localhost:3000/uploads/${user.avatar}` // prepend backend URL
              : 'img1.jpg' // default avatar
          };
        }); this.CategoresDoctors = {};
        this.doctors.forEach(doc => {
          if (!this.CategoresDoctors[doc.specialization]) {
            this.CategoresDoctors[doc.specialization] = [];
          }
          this.CategoresDoctors[doc.specialization].push(doc);
        });

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load data';
        this.loading = false;
      }
    });
  }


}
