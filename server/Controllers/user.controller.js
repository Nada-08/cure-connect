const User = require('../models/Users.model')
const Doctor = require('../models/Doctors.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        const { name, email, password, phone, role, specialization, licensNum, availableDay} = req.body;

        const user = await User.findOne({ email: email })
        if (user) return res.status(400).json({ message: 'Email already exists' })

        const hashedPassword = bcrypt.hashSync(password, 7)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
            // avatar: req.file.filename
        })

        // newUser.token = token

        const savedUser = await newUser.save()

        if (role === 'doctor') {
            const newDoctor = new Doctor({
                userId: savedUser._id,
                specialization,
                licensNum,
                availableDay
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
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
            res.status(200).json({ message: 'Logged in successfully', token: token })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error from server' })
    }
}

module.exports = { getAllUsers, register, login }