import { Component, OnInit } from '@angular/core';
import { Doctors } from '../types/doctors';
import { DoctorsRequestService } from '../services/doctors-request.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
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
    selectedSpecialization: string | null = null;
  CategoresDoctors: { [specialization: string]: Doctors[] } = {};
  constructor(private doctorsRequest: DoctorsRequestService,private route: ActivatedRoute) { }

  ngOnInit() {

    this.selectedSpecialization = this.route.snapshot.paramMap.get('specialization');

    forkJoin({
      doctors: this.doctorsRequest.getDoctors(),
      users: this.doctorsRequest.getUsers()
    }).subscribe({
      next: ({ doctors, users }) => {
        this.users = users;

        this.doctors = doctors.map(doctor => {
          const user = users.find(u => u._id === doctor.userId);
          return {
            ...doctor,
            name: user?.name || 'Unknown',
            avatar: user?.avatar
              ? `http://localhost:3000/uploads/${user.avatar}`
              : 'img1.jpg'
          };
        });

        this.CategoresDoctors = {};
        this.doctors.forEach(doc => {
          if (!this.CategoresDoctors[doc.specialization]) {
            this.CategoresDoctors[doc.specialization] = [];
          }
          this.CategoresDoctors[doc.specialization].push(doc);
        });

        if (this.selectedSpecialization) {
          this.CategoresDoctors = {
            [this.selectedSpecialization]: this.CategoresDoctors[this.selectedSpecialization] || []
          };
        }

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
