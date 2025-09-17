import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../types/appointment';
import { AppointmentRequestService } from '../services/appointment-request.service';
import { Doctors } from '../types/doctors';
import { DoctorsRequestService } from '../services/doctors-request.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-update-appointment',
  imports: [FormsModule, CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule],
  templateUrl: './update-appointment.component.html',
  styleUrl: './update-appointment.component.css'
})
export class UpdateAppointmentComponent {

  @Input() showForm: boolean = true;
  @Input() appointment!: Appointment;
  @Input() doctor?: Doctors; // pass the doctor info
  @Output() formClosed = new EventEmitter<void>();
  @Output() appointmentUpdated = new EventEmitter<Appointment>();

  dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dateError: string | null = null;
  minDate = new Date();

  constructor(
    private appointmentRequestService: AppointmentRequestService,
    private doctorsRequestService: DoctorsRequestService
  ) { }

  ngOnInit() {
    if (this.appointment && this.appointment.doctorId) {
      // this.doctorsRequestService.getDoctorById(this.appointment.doctorId).subscribe({
      //   next: (doctor: Doctors) => {
      //     this.doctor = doctor;
      //   },
      //   error: (err) => console.error('Error fetching doctor info', err)
      // });
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

  updateAppointment() {
    if (!this.appointment || !this.appointment._id) {
      alert('Appointment ID is required');
      return;
    }

    this.appointmentRequestService.updateAppointment(this.appointment._id, this.appointment).subscribe({
      next: (res) => {
        console.log('Appointment updated:', res);
        this.appointmentUpdated.emit(res);
        this.closeForm();
      },
      error: (err) => {
        console.error('Error updating appointment:', err);
        alert('Failed to update appointment. Please try again.');
      }
    });
  }

  closeForm() {
    this.formClosed.emit();
  }
}
