    const mongoose = require('mongoose')

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: [3, "name must be at least 3 characters"]
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
        },
        password: {
            type: String,
            required: true,
            minlength: [5, "password must be at least 5 characters"]
        },
        phone: {
            type: String,
            required: false,
            match: [/^\d{11}$/, "phone must be 11 digits"]
        },
        avatar: {
            type: String,
            default: '/profile-pic.jpg'
        },
        role: {
            type: String,
            enum: ["patient", "admin", "doctor"],
            default: "Patient"
        }
    })

    module.exports = mongoose.model("users", userSchema)