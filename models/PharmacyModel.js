const mongoose = require('mongoose')

const PharmacySchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
 
    },
    image: {
        type: Object,
        default: ''
    }
   
}, {
    timestamps: true
})

module.exports = mongoose.model("Pharmacy", PharmacySchema)