const MedicineForms = require("../models/MedicineFormModel");
const Users = require("../models/UserModel");
const Doctors = require("../models/DoctorModel");

const MedicineFormCtrl = {
  /**
   * Create medicine form
   */
  addMedicineForm: async (req, res) => {
    try {
      const { user_id, doctor_id, diagnostic, prescriptions, note } = req.body;

      // check valid user
      const validUser = await Users.findOne({ _id: user_id })
        .select("_id")
        .lean();
      if (!validUser) return res.status(400).json({ msg: "Wrong user!" });

      // check valid doctor
      const validDoctor = await Doctors.findOne({ _id: doctor_id })
        .select("_id")
        .lean();
      // const validDoctor = await Doctors.findById(req.doctor.id)
      if (!validDoctor) return res.status(400).json({ msg: "Wrong doctor!" });

      const newForm = new MedicineForms({
        user_id,
        doctor_id,
        // doctor_id: req.doctor.id,
        diagnostic,
        prescriptions,
        note,
      });

      //Save to MongoDB
      await newForm.save();

      res.json({
        status: "Form was successfully created!",
        data: newForm,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Get all medicine
   */
  getAllMedicineFormsForDoctor: async (req, res) => {
    try {
      const forms = await MedicineForms.find({ doctor_id: req.doctor.id })
        .populate({
          path: "user_id", select: "-_id -__v",
        })
        .populate({
          path: "doctor_id", select: "-_id -__v",
        })
        .populate({
          path: "prescriptions", select: "-_id -__v",
          populate: { path: "medicine", select: "-_id -__v" }
        });
      if (!forms) return res.status(400).json({ msg: "NOT found!" });

      res.json(forms);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllMedicineFormsForPatient: async (req, res) => {
    try {
      const forms = await MedicineForms.find({ user_id: req.user.id })
        .populate({
          path: "user_id", select: "-_id -__v",
        })
        .populate({
          path: "doctor_id", select: "-_id -__v",
        })
        .populate({
          path: "prescriptions", select: "-_id -__v",
          populate: { path: "medicine", select: "-_id -__v" }
        });
      if (!forms) return res.status(400).json({ msg: "NOT found!" });

      res.json(forms);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Delete medicine form by ID
   */
  deleteMedicineFormByID: async (req, res) => {
    try {
      await MedicineForms.findByIdAndDelete(req.params.id);
      res.json({ msg: `Medicine Form ${req.params.id} has been deleted.` });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Update medicine form by ID
   */
  updateMedicineFormByID: async (req, res) => {
    try {
      const { prescriptions, note } = req.body;

      await MedicineForms.findOneAndUpdate(
        { _id: req.params.id },
        {
          prescriptions,
          note,
        },
      );

      res.json({ msg: `Form has been updated!` });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = MedicineFormCtrl;
