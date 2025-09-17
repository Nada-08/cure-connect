const mongoose = require('mongoose')

const DoctorsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
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
    description: {

        type: String,
        required: true

    },
    availableDay: {
        type: [String],
        required: true,
        validate: {
            validator: function (days) {
                return days.length > 0
            },
            message: "at least one available day is required"
        }

    }
})


module.exports = mongoose.model("doctors", DoctorsSchema)