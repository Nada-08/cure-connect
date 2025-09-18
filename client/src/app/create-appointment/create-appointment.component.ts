import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from '../types/appointment';
import { AppointmentRequestService } from '../services/appointment-request.service';
import { Doctors } from '../types/doctors';
import { DoctorsRequestService } from '../services/doctors-request.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { UserRequestService } from '../services/user-request.service';

@Component({
  selector: 'app-create-appointment',
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.css'
})
export class CreateAppointmentComponent {
  @Input() showForm: boolean = true;
  @Input() doctorId?: string;
  @Input() appointmentId?: string;

  doctor?: Doctors;
  existingAppointment: boolean = false;

  dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dateError: string | null = null;
  minDate: Date = new Date();

  @Output() formClosed = new EventEmitter<void>();
  @Output() appointmentCreated = new EventEmitter<Appointment>();

  appointment: Appointment = {
    userId: '',
    doctorId: '',
    date: new Date(),
    status: 'pending'
  };

  constructor(
    private appointmentRequestService: AppointmentRequestService,
    private doctorsRequestService: DoctorsRequestService,
    private userRequestService: UserRequestService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.userRequestService.getLoggedInUser().subscribe({
      next: (user) => {
        this.appointment.userId = typeof user._id === 'string' ? user._id : user._id.toString();

        if (this.appointmentId) {
          this.existingAppointment = true;
          this.appointmentRequestService.getAppointmentById(this.appointmentId).subscribe({
            next: (appt) => {
              this.appointment = {
                ...appt,
                doctorId: typeof appt.doctorId === 'string' ? appt.doctorId : appt.doctorId._id,
                userId: typeof appt.userId === 'string' ? appt.userId : appt.userId._id,
                date: new Date(appt.date),
              };

              this.doctorId = typeof appt.doctorId === 'string' ? appt.doctorId : appt.doctorId._id;

              if (this.doctorId) {
                this.doctorsRequestService.getDoctorById(this.doctorId).subscribe({
                  next: (doctor: Doctors) => this.doctor = doctor,
                  error: (err) => console.error('Error fetching doctor info', err)
                });
              }
            },
            error: (err) => console.error('Failed to load appointment', err)
          });
        } else if (this.doctorId) {
          // if doctorId is passed via @Input() and no appointmentId
          this.doctorsRequestService.getDoctorById(this.doctorId).subscribe({
            next: (doctor: Doctors) => this.doctor = doctor,
            error: (err) => console.error('Error fetching doctor info', err)
          });
        }
      },
      error: (err) => {
        console.error('Failed to get logged-in user', err);
        this.router.navigate(['/login']);
      }
    });
  }



  private loadLoggedInUser() {
    this.userRequestService.getLoggedInUser().subscribe({
      next: (user) => {
        this.appointment.userId = typeof user._id === 'string' ? user._id : user._id.toString();
      },
      error: () => {
        console.error('Failed to get logged-in user');
        this.router.navigate(['/login']);
      }
    });
  }


  saveAppointment() {
    if (!this.appointment.userId) {
      alert('User not logged in');
      return;
    }
    if (!this.doctorId || !this.appointment.date) {
      alert('Please fill in all required fields');
      return;
    }

    this.appointment.doctorId = this.doctorId;

    if (this.appointmentId) {
      // 🔹 update existing appointment
      this.appointmentRequestService.updateAppointment(this.appointmentId, this.appointment).subscribe({
        next: (res) => {
          console.log('Appointment updated:', res);
          this.appointmentCreated.emit(res);
          this.closeForm();
        },
        error: (err) => {
          console.error('Error updating appointment', err);
          alert('Failed to update appointment. Please try again.');
        }
      });
    } else {
      // 🔹 create new appointment
      this.appointmentRequestService.addAppointment(this.appointment).subscribe({
        next: (res) => {
          console.log('Appointment created:', res);
          this.appointmentCreated.emit(res);
          this.resetForm();
          this.closeForm();
        },
        error: (err) => {
          console.error('Error creating appointment', err);
          alert('Failed to create appointment. Please try again.');
        }
      });
    }
  }

  dateFilter = (d: Date | null): boolean => {
    if (!d || !this.doctor) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (d < today) return false;

    const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
    const isAvailable = this.doctor.availableDay.includes(dayName);

    this.dateError = isAvailable ? null : `This doctor is not available on ${dayName}`;
    return isAvailable;
  };

  closeForm() {
    this.formClosed.emit();
    this.location.back();
  }

  private resetForm() {
    this.appointment = {
      userId: '',
      doctorId: '',
      date: new Date(),
      status: 'pending'
    };
  }
}
