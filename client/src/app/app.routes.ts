import { Routes } from '@angular/router';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { AppointmentsDashboardComponent } from './appointments-dashboard/appointments-dashboard.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Cure Connect'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'signup',
        component: SignupComponent,
        title: 'Sign Up'
    },
        {
            // path: 'category-page',
            path: 'category-page/:specialization',
            component: CategoryPageComponent,
            title: "category-page",
        },
    {
        path: 'appointments',
        component: AppointmentsDashboardComponent,
        title: 'Appointments',
    },
    {
        path: 'create-appointment',
        component: CreateAppointmentComponent,
        title: 'New Appointment'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Page Not Found'
    }
];
