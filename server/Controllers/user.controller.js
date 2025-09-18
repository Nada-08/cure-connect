const User = require('../models/Users.model')
const Doctor = require('../models/Doctors.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const AppointmentModel = require('../models/Appointment.model')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { '__v': false, 'password': false })
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: 'Error from server' })
    }
}

const register = async (req, res) => {
    try {
        const { name, email, password, phone, role, specialization, licensNum, availableDay, description } = req.body;

        const user = await User.findOne({ email: email })
        if (user) return res.status(400).json({ message: 'Email already exists' })

        const hashedPassword = bcrypt.hashSync(password, 7)

        // console.log(req.file.filename);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
            avatar: req.file.filename
        })


        const savedUser = await newUser.save()

        if (role === 'doctor') {
            const newDoctor = new Doctor({
                userId: savedUser._id,
                specialization,
                description,
                licensNum,
                availableDay: JSON.parse(req.body.availableDay)
            })
            await newDoctor.save()
        }

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })


        res.status(201).json({
            message: 'User created successfully', user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role
            }, token: token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error from server', error: err })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email })
        if (!user) return res.status(404).json({ message: 'User not found' })

        const comparedPassword = await bcrypt.compare(password, user.password)
        if (comparedPassword) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
            res.status(200).json({ message: 'Logged in successfully', token: token })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error from server' })
    }
}


const getUserAppointments = async (req, res) => {
        try {
            const userId = req.user.id;
            const appointments = await AppointmentModel.find({ userId })
            .populate({
            path: 'doctorId',
            populate: { path: 'userId', select: 'name' }  // doctor has reference to user
        })
        .populate({
            path: 'userId',
            select: 'name' // patient name
        });

            res.status(200).json({ appointments });
        } catch (err) {
            res.status(500).json({ message: "Error from server", error: err.message });
        }
};

const Delete_Appointment=async(req,res)=>{
    try{
        let id=req.params.AppointmentId;
        const deleted=await AppointmentModel.deleteOne({_id:id})
        if(deleted.deletedCount ===0){
            return res.status(404).json({ error: 'Cannot find Appointment by this id' });
        }
        res.status(200).json({ message: 'Deleted Successfully' })
    } 
    catch(err) {
        res.status(500).json({ message: 'Error from Server', error: err })
    
    }
}

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // req.user comes from verifyToken middleware
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { getAllUsers, register, login, getUserAppointments,Delete_Appointment, getMe }