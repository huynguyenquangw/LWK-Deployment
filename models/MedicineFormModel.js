const mongoose = require("mongoose");

const PrescriptionSchema = mongoose.Schema(
    {
        medicine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Medicines",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        },
        frequency: {
            type: String,
            required: true,
        },
    },
);

const MedicineFormSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
        doctor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctors",
            required: true
        },
        diagnostic: {
            type: String,
            required: true,
        },
        prescriptions: {
            type: [PrescriptionSchema],
        },
        note: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("MedicineForms", MedicineFormSchema);
