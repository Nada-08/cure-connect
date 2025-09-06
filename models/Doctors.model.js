const mongoose = require('mongoose')

const DoctorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "name must be at least 3 characters"]
    },
    specialization: {
        type: String,
        required: true
    },
    licensNum: {
        type: String,
        required: true,
        unique: true
    },
    availableDay: {
        type: [String],
        required: false,
        validate: {
            validator: function (days) {
                return days.length > 0
            },
            message:"at least one available day is required"
        }

    }
})

module.exports = mongoose.model("Doctors", DoctorsSchema)