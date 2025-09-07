const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctors",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "canceled"],
        default: "pending"
    }
}, { timestamps: true })

module.exports = mongoose.model("appointment", appointmentSchema)