const mongoose = require('mongoose')

const DoctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 2
    },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Districts",
    },
    phone: {
        type: String,
        trim: true,
        default: ''
    },
    certificate: {
        type: Object
    },
    experience: {
        type: String,
        default: ''
    },
    img: {
        type: Object
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Doctors", DoctorSchema)