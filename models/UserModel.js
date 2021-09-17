const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
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
        default: 0
    },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Districts",
        required: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: Object
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', UserSchema)