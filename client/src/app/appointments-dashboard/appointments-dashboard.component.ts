import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../types/appointment';
import { AppointmentRequestService } from '../services/appointment-request.service';

@Component({
  selector: 'app-appointments-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments-dashboard.component.html',
  styleUrls: ['./appointments-dashboard.component.css'],
})
export class AppointmentsDashboardComponent {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];

  stats = {
    total: 0,
    confirmed: 0,
    pending: 0,
    canceled: 0,
  };

  searchQuery = '';
  selectedFilter: 'all' | 'confirmed' | 'pending' | 'canceled' = 'all';

  monthDays: number[] = [];
  blankDays: number[] = [];
  year = new Date().getFullYear();
  month = new Date().getMonth();
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  weekdays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  constructor(private appointmentRequestService: AppointmentRequestService) {}

  ngOnInit(): void {
  this.generateCalendar();

  this.appointmentRequestService.getAppointments().subscribe({
    next: (data: any) => {
      this.appointments = data.appointments.map((a: any) => ({
  ...a,
  date: new Date(a.date),
  userName: a.userId?.name || 'Current User',
  doctorName: a.doctorId?.userId?.name || 'Unknown Doctor'
}));

    
      this.filterAppointments();
      this.generateCalendar();
      this.updateStats();
    },
    error: (err) => console.error('Error fetching appointments:', err),
  });
}


  filterAppointments(): void {
    const search = this.searchQuery?.toLowerCase() || '';

    this.filteredAppointments = this.appointments.filter((a) => {
      const matchesFilter =
        this.selectedFilter === 'all' || a.status === this.selectedFilter;

      const doctorStr = a.doctorName || '';
      const userStr = a.userName || '';

      const matchesSearch =
        doctorStr.toLowerCase().includes(search) ||
        userStr.toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    });
  }

  updateStats(): void {
    this.stats.total = this.appointments.length;
    this.stats.confirmed = this.appointments.filter(a => a.status === 'confirmed').length;
    this.stats.pending = this.appointments.filter(a => a.status === 'pending').length;
    this.stats.canceled = this.appointments.filter(a => a.status === 'canceled').length;
  }

  cancelAppointment(id: string): void {
  if (!id) return;

  this.appointmentRequestService.deleteAppointment(id).subscribe({
    next: () => {
      this.appointments = this.appointments.filter(a => a._id !== id);
      this.filterAppointments();
      this.updateStats();
      console.log(`Appointment ${id} canceled successfully`);
    },
    error: (err) => console.error('Error canceling appointment:', err),
  });
}

  getAppointmentsForDay(day: number) {
    return this.appointments.filter(
      appt =>
        appt.date.getFullYear() === this.year &&
        appt.date.getMonth() === this.month &&
        appt.date.getDate() === day
    );
  }

  onSearchChange(): void { this.filterAppointments(); }
  onFilterChange(): void { this.filterAppointments(); }

  prevMonth(): void {
    if (this.month === 0) { this.month = 11; this.year--; }
    else this.month--;
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.month === 11) { this.month = 0; this.year++; }
    else this.month++;
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.blankDays = [];
    this.monthDays = [];

    const firstDay = new Date(this.year, this.month, 1);
    let startDay = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    for (let i = 0; i < startDay; i++) this.blankDays.push(i);
    for (let i = 1; i <= daysInMonth; i++) this.monthDays.push(i);
  }

  hasAppointment(day: number): boolean {
    return this.appointments.some(
      appt =>
        appt.date.getFullYear() === this.year &&
        appt.date.getMonth() === this.month &&
        appt.date.getDate() === day
    );
  }
  updateAppointment(id: string): void {
  
}

}
