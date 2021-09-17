const mongoose = require('mongoose')

const HealthDeclarationSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true,
    },
    medicineform_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedicineForms',
    },
    fever: {
        type: Boolean,
        required: true,

    },
    cough: {
        type: Boolean,
        required: true,

    },
    breathing: {
        type: Boolean,
        required: true
    },
    sorethroat: {
        type: Boolean,
        required: true

    },
    phlegm: {
        type: Boolean,
        required: true

    },
    runnynose: {
        type: Boolean,
        required: true

    },
    tiredness: {
        type: Boolean,
        required: true
    },
    blocknose: {
        type: Boolean,
        required: true
    },
    losssmell: {
        type: Boolean,
        required: true
    },
    musclepain: {
        type: Boolean,
        required: true
    },
    vaccinated: {
        type: Boolean,
        required: true
    },
    covid: {
        type: Boolean,
        required: true
    },
    othersymptoms: {
        type: String,
        default: ''
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("HealthDeclaration", HealthDeclarationSchema)