const mongoose = require("mongoose");

const MedicineSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    type: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
  },
  {
    timestamp: true
  }
);

module.exports = mongoose.model("Medicines", MedicineSchema);
