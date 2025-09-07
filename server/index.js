require('dotenv').config()
const express = require('express');
const connection = require('./DataBase/Connection');
const AdminRoute = require('./routes/Admin.route');
const PatientsRoute = require('./routes/Patients.route');
const DoctorsRoute = require('./routes/Doctors.route');
const UsersRouter = require('./routes/user.route');
const path = require('node:path')
const { Server } = require("socket.io");
const cors = require('cors')
const http = require('node:http');
const app = express();

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})
io.on('connection', (socket)=>{
    console.log('user connected ', socket.id)
})

app.use(express.json());

app.use('/api/admin', AdminRoute);
app.use('/api/patients', PatientsRoute);
app.use('/api/doctor', DoctorsRoute);
app.use('/api/users', UsersRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

connection();

app.all('/{*any}',(req,res)=>{
    res.status(404).json({message: 'This resource is not found'})
})
const port = process.env.PORT || 3000
server.listen(port,()=>{
    console.log('Listening on port 3000')
})