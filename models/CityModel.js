const mongoose = require("mongoose");

const CitySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        abbreviation: {
            type: String,
            unique: true,
        },
        postcode: {
            type: Number,
            required: true,
            unique: true,
        },
    },{
    timestamps: true
});

module.exports = mongoose.model("Cities", CitySchema);
