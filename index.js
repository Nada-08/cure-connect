const express = require('express');
const connection= require('./DataBase/Connection');
const AdminRoute=require('./routes/Admin.route');
const PatientsRoute=require('./routes/Patients.route');
const DoctorsRoute=require('./routes/Doctors.route');
const AppointmentsRoute=require('./routes/Appointments.route');
const app = express();
app.use(express.json());
app.use('/api/admin',AdminRoute);
app.use('/api/patients',PatientsRoute);
app.use('/api/doctor',DoctorsRoute);
app.use('/api/appointments',AppointmentsRoute);
connection();
app.listen(3000,()=>{
    console.log("Server is runnig");
})