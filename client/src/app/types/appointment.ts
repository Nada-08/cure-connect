import { Users } from './users';
export interface Appointment {
    _id?: string;
    userId: string | Users;
    doctorId: string | { _id: string; userId: Users };
    date: Date;
    status: 'confirmed' | 'pending' | 'canceled';
    doctorName?: string;
    userName?: string;
}