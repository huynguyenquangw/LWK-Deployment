const HealthDeclaration = require('../models/HealthDeclarationModel')
const Doctors = require('../models/DoctorModel')
const Users = require('../models/UserModel')
const bcrypt = require('bcrypt')

//Search, filter, sort and paginate
class APIfeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    filter() {
        const queryObj = { ...this.queryString } // = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(ex => delete (queryObj[ex]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))
        return this
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')

            this.query = this.query.sort(sortBy)
        }
        else {
            this.query = this.query.sort('-createdAt')
        }

        return this
    }

    paginate() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 1
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}


const HealthDeclarationCtrl = {


    // Create a Health Declaration
    add: async (req, res) => {

        try {
            const { user_id, doctor_id, fever, cough, breathing, sorethroat, phlegm,
                runnynose, tiredness, blocknose, losssmell, musclepain, vaccinated, covid, othersymptoms } = req.body

            const user = await Users.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: "The user does not exist." })

            const doctor = await Doctors.findById({ _id: doctor_id })
            if (!doctor) return res.status(400).json({ msg: "The doctor does not exist." })

            // Objectid of User is automatically filled in when the user logs in
            const newHealthDeclaration = new HealthDeclaration(
                {
                    user_id: req.user.id, doctor_id, fever, cough, breathing, sorethroat, phlegm,
                    runnynose, tiredness, blocknose, losssmell, musclepain, vaccinated, covid, othersymptoms
                }
            )
            //Save to MongoDB
            await newHealthDeclaration.save()

            // res.json({
            //     msg: `Health Declaration has been added!`,
            // })
            res.json(newHealthDeclaration)

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    // Get a Health Declaration for Patient
    getHealthDeclarationForPatient: async (req, res) => {
        try {
            const features = new APIfeatures(HealthDeclaration.find({ user_id: req.user.id })
                .populate({
                    path: "doctor_id",
                    select: "-password"
                })
                .populate({
                    path: "medicineform_id",
                    select: "-__v",
                    populate: {
                        path: "prescriptions",
                        populate: {
                            path: "medicine"
                        }
                    }
                }),
                req.query)
                .filter().sort().paginate()

            const healthdeclaration = await features.query

            if (!healthdeclaration) return res.status(400).json({ msg: 'Health Declaration does not exist.' })

            res.json({
                status: 'Success',
                results: healthdeclaration.length,
                data: healthdeclaration
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    // Get a Health Declaration for Doctor
    getHealthDeclarationForDoctor: async (req, res) => {
        try {
            const features = new APIfeatures(HealthDeclaration.find({ doctor_id: req.doctor.id })
                .populate({
                    path: "user_id",
                })
                .populate({
                    path: "medicineform_id",
                    select: "-__v",
                    populate: {
                        path: "prescriptions",
                        populate: {
                            path: "medicine"
                        }
                    }
                }),
                req.query)
                .filter().sort().paginate()

            const healthdeclaration = await features.query

            if (!healthdeclaration) return res.status(400).json({ msg: 'Health Declaration does not exist.' })

            res.json({
                status: 'Success',
                results: healthdeclaration.length,
                data: healthdeclaration
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    // Update Health Declaration
    updateHealthDeclarationByID: async (req, res) => {
        try {
            const { user_id, doctor_id, fever, cough, breathing, sorethroat, phlegm,
                runnynose, tiredness, blocknose, losssmell, musclepain, vaccinated, covid, othersymptoms } = req.body


            await HealthDeclaration.findByIdAndUpdate({ _id: req.params.id }, {
                user_id, doctor_id, fever, cough, breathing, sorethroat, phlegm,
                runnynose, tiredness, blocknose, losssmell, musclepain, vaccinated, covid, othersymptoms
            })

            res.json({ msg: `Health Declaration of Pt.${user_id} assigned to Doctor. ${doctor_id}has been updated.` })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //Update medicine ID for health declaration
    updateMedicineForHealthDeclaration: async (req, res) => {
        try {
            const { medicineform_id, status } = req.body

            await HealthDeclaration.findByIdAndUpdate({ _id: req.params.id }, {
                medicineform_id, status
            })

            res.json({ msg: `Medicine ${medicineform_id} has been transferred to Health Declaration ${req.params.id}.` })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //Get All Health Declaration
    getAllHealthDeclaration: async (req, res) => {
        try {
            const features = new APIfeatures(HealthDeclaration.find().populate({
                path: "user_id",
            }).populate({ path: "doctor_id" }), req.query)
                .filter().sort().paginate()

            const healthform = await features.query

            res.json({
                status: 'Success',
                results: healthform.length,
                data: healthform
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    //Delete by ID
    deleteHealthDeclarationByID: async (req, res) => {
        try {
            await HealthDeclaration.findByIdAndDelete(req.params.id)
            res.json({ msg: `Health Declaration ${req.params.id} has been deleted.` })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }

}
module.exports = HealthDeclarationCtrl