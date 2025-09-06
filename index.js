const express = require('express');
const connection = require('./DataBase/connection');
const AdminRoute = require('./routes/Admin.route');
const PatientsRoute = require('./routes/Patients.route');
const DoctorsRoute = require('./routes/Doctors.route');
const AppointmentsRoute = require('./routes/Appointments.route');
const UsersRouter = require('./routes/user.route');
const path = require('node:path')

const app = express();

app.use(express.json());

app.use('/api/admin', AdminRoute);
app.use('/api/patients', PatientsRoute);
app.use('/api/doctor', DoctorsRoute);
app.use('/api/appointments', AppointmentsRoute);
app.use('/api/users', UsersRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

connection();

app.listen(3000, () => {
    console.log("Server is running");
})