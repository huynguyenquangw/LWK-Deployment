const mongoose = require('mongoose'); Schema = mongoose.Schema;

const DistrictSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        abbreviation: {
            type: String,
        },
        postcode: {
            type: Number,
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cities",
            required: true
        },
    },{
    timestamps: true
}
)

module.exports = mongoose.model("Districts", DistrictSchema)