// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Doctors } from '../types/doctors';
// import { DoctorsRequestService } from '../services/doctors-request.service';
// @Component({
//   selector: 'app-category-page',
//   imports: [],
//   templateUrl: './category-page.component.html',
//   styleUrl: './category-page.component.css'
// })
// export class CategoryPageComponent {
//   doctors?: Doctors[];

//   constructor(private doctorsRequest: DoctorsRequestService) { }

//   ngOnInit() { this.doctorsRequest.getDoctors().subscribe((data: Doctors[]) => this.doctors = data) }


// }
//   // doctors: any[] =
//   //   [
//   //     {
//   //       "id": 1,
//   //       "title": "Emergency Department",
//   //       "name": "Dr. Michael Johnson",
//   //       "specialty": "Emergency Medicine Specialist",
//   //       "image": "img1.jpg",
//   //       "description": "Dr. Johnson is a highly experienced emergency medicine physician with over 15 years of experience. He is board-certified in emergency medicine and has a special interest in disaster management.",
//   //       "availableDays": ["Monday", "Wednesday", "Friday"]
//   //     },
//   //     {
//   //       "id": 2,
//   //       "title": "Emergency Department",
//   //       "name": "Dr. Michael Johnson",
//   //       "specialty": "Emergency Medicine Specialist",
//   //       "image": "img1.jpg",
//   //       "description": "Dr. Johnson is a highly experienced emergency medicine physician with over 15 years of experience. He is board-certified in emergency medicine and has a special interest in disaster management.",
//   //       "availableDays": ["Monday", "Wednesday", "Friday"]
//   //     },
//   //     {
//   //       "id": 3,
//   //       "title": "Emergency Department",
//   //       "name": "Dr. Michael Johnson",
//   //       "specialty": "Emergency Medicine Specialist",
//   //       "image": "img1.jpg",
//   //       "description": "Dr. Johnson is a highly experienced emergency medicine physician with over 15 years of experience. He is board-certified in emergency medicine and has a special interest in disaster management.",
//   //       "availableDays": ["Monday", "Wednesday", "Friday"]
//   //     },
//   //     {
//   //       "id": 4,
//   //       "title": "Emergency Department",
//   //       "name": "Dr. Michael Johnson",
//   //       "specialty": "Emergency Medicine Specialist",
//   //       "image": "img1.jpg",
//   //       "description": "Dr. Johnson is a highly experienced emergency medicine physician with over 15 years of experience. He is board-certified in emergency medicine and has a special interest in disaster management.",
//   //       "availableDays": ["Monday", "Wednesday", "Friday"]
//   //     },
//   //     {
//   //       "id": 5,
//   //       "title": "Emergency Department",
//   //       "name": "Dr. Michael Johnson",
//   //       "specialty": "Emergency Medicine Specialist",
//   //       "image": "img1.jpg",
//   //       "description": "Dr. Johnson is a highly experienced emergency medicine physician with over 15 years of experience. He is board-certified in emergency medicine and has a special interest in disaster management.",
//   //       "availableDays": ["Monday", "Wednesday", "Friday"]
//   //     },
//   //     {
//   //       "id": 6,
//   //       "title": "Emergency Department",
//   //       "name": "Dr. Michael Johnson",
//   //       "specialty": "Emergency Medicine Specialist",
//   //       "image": "img1.jpg",
//   //       "description": "Dr. Johnson is a highly experienced emergency medicine physician with over 15 years of experience. He is board-certified in emergency medicine and has a special interest in disaster management.",
//   //       "availableDays": ["Monday", "Wednesday", "Friday"]
//   //     },
//   //     {
//   //       "id": 7,
//   //       "title": "Emergency Department",
//   //       "name": "Dr. Michael Johnson",
//   //       "specialty": "Emergency Medicine Specialist",
//   //       "image": "img1.jpg",
//   //       "description": "Dr. Johnson is a highly experienced emergency medicine physician with over 15 years of experience. He is board-certified in emergency medicine and has a special interest in disaster management.",
//   //       "availableDays": ["Monday", "Wednesday", "Friday"]
//   //     },
//   //     {
//   //       "id": 8,
//   //       "title": "Emergency Department",
//   //       "name": "Dr. Michael Johnson",
//   //       "specialty": "Emergency Medicine Specialist",
//   //       "image": "img1.jpg",
//   //       "description": "Dr. Johnson is a highly experienced emergency medicine physician with over 15 years of experience. He is board-certified in emergency medicine and has a special interest in disaster management.",
//   //       "availableDays": ["Monday", "Wednesday", "Friday"]
//   //     },
//   //     {
//   //       "id": 9,
//   //       "title": "Emergency Department",
//   //       "name": "Dr. Michael Johnson",
//   //       "specialty": "Emergency Medicine Specialist",
//   //       "image": "img1.jpg",
//   //       "description": "Dr. Johnson is a highly experienced emergency medicine physician with over 15 years of experience. He is board-certified in emergency medicine and has a special interest in disaster management.",
//   //       "availableDays": ["Monday", "Wednesday", "Friday"]
//   //     },
//   //     {
//   //       "id": 10,
//   //       "title": "Emergency Department",
//   //       "name": "Dr. Michael Johnson",
//   //       "specialty": "Emergency Medicine Specialist",
//   //       "image": "img1.jpg",
//   //       "description": "Dr. Johnson is a highly experienced emergency medicine physician with over 15 years of experience. He is board-certified in emergency medicine and has a special interest in disaster management.",
//   //       "availableDays": ["Monday", "Wednesday", "Friday"]
//   //     },
//   //     {
//   //       "id": 11,
//   //       "title": "Emergency Department",
//   //       "name": "Dr. Michael Johnson",
//   //       "specialty": "Emergency Medicine Specialist",
//   //       "image": "img1.jpg",
//   //       "description": "Dr. Johnson is a highly experienced emergency medicine physician with over 15 years of experience. He is board-certified in emergency medicine and has a special interest in disaster management.",
//   //       "availableDays": ["Monday", "Wednesday", "Friday"]
//   //     },
//   //     {
//   //       "id": 12,
//   //       "title": "Emergency Department",
//   //       "name": "Dr. Michael Johnson",
//   //       "specialty": "Emergency Medicine Specialist",
//   //       "image": "img1.jpg",
//   //       "description": "Dr. Johnson is a highly experienced emergency medicine physician with over 15 years of experience. He is board-certified in emergency medicine and has a special interest in disaster management.",
//   //       "availableDays": ["Monday", "Wednesday", "Friday"]
//   //     },
//   //     {
//   //       "id": 13,
//   //       "title": "Emergency Department",
//   //       "name": "Dr. Michael Johnson",
//   //       "specialty": "Emergency Medicine Specialist",
//   //       "image": "img1.jpg",
//   //       "description": "Dr. Johnson is a highly experienced emergency medicine physician with over 15 years of experience. He is board-certified in emergency medicine and has a special interest in disaster management.",
//   //       "availableDays": ["Monday", "Wednesday", "Friday"]
//   //     }

//   //   ]


import { Component, OnInit } from '@angular/core';
import { Doctors } from '../types/doctors';
import { DoctorsRequestService } from '../services/doctors-request.service';
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-page',
  imports: [RouterLink],
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  doctors?: Doctors[];
  loading: boolean = true;
  error: string = '';
  users: any;

  constructor(private doctorsRequest: DoctorsRequestService) { }

  ngOnInit() {
  //   this.doctorsRequest.getDoctors().subscribe({
  //     next: (data: Doctors[]) => {
  //       console.log('Doctors data:', data); // شوف في الكونسول
  //       this.doctors = data;
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.error = 'Failed to load doctors';
  //       this.loading = false;
  //     }
  //   });
  //   this.doctorsRequest.getUsers().subscribe(users => {
  //     this.users = users;

  //     this.doctorsRequest.getDoctors().subscribe({
  //       next: (data: Doctors[]) => {
  //         // نعمل match بين doctor.userId و users._id
  //         this.doctors = data.map(doctor => {
  //           const user = this.users?.find(u => u._id === doctor.userId);
  //           return { ...doctor, name: user?.name || 'Unknown' };
  //         });

  //         this.loading = false;
  //       },
  //       error: (err) => {
  //         console.error(err);
  //         this.error = 'Failed to load doctors';
  //         this.loading = false;
  //       }
  //     });
  //   });
  // }

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
          return { ...doctor, 
            name: user?.name || 'Unknown', 
            avatar: user?.avatar 
              ? `http://localhost:3000/uploads/${user.avatar}` // prepend backend URL
              : 'img1.jpg' // default avatar
          };
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
