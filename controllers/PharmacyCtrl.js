const Pharmacy = require('../models/PharmacyModel')
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

const PharmacyCtrl = {

    // Add a pharmacy
    add: async (req, res) => {

        try {
            const { brand, district, city, availability, image } = req.body

            // const user = await Users.findById(req.user.id)
            // if (!user) return res.status(400).json({ msg: "The user does not exist." })

            // const doctor = await Doctors.findById({ _id: doctor_id })
            // if (!doctor) return res.status(400).json({ msg: "The doctor does not exist." })
            
            // Objectid of User is automatically filled in when the user logs in
            const newPharmacy = new Pharmacy(
                {
                    brand, district, city, availability, image
                }
            )
            //Save to MongoDB
            await newPharmacy.save()

            res.json({
                msg: `Pharmacy has been added!`,
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    // Get all Pharmacy
    getAllPharmacy: async (req, res) => {
        try {
            const features = new APIfeatures(Pharmacy.find(), req.query)
                .filter().sort().paginate()
            const pharmacylocation = await features.query

            res.json({
                status: 'Success',
                results: pharmacylocation.length,
                data: pharmacylocation
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    // Update Pharmacy by ID
    updatePharmacyByID: async (req, res) => {
        try {
            const { brand, district, city, availability, image } = req.body


            await Pharmacy.findByIdAndUpdate({ _id: req.params.id }, {
                brand, district, city, availability, image
            })

            res.json({ msg: `Pharmacy at Brand:${brand} , has been updated!` })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
     // Get a Pharmacy by ID
     getPharmacy: async (req, res) => {
        try {
           // const healthdeclaration = await HealthDeclaration.findById(req.healthdeclaration.id)
           const pharmacy = await Pharmacy.findById(req.params.id)
            if (!pharmacy) return res.status(400).json({ msg: 'Pharmacy does not exist.' })

            res.json(pharmacy)

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
     //Delete by ID
     deletePharmacyByID: async (req, res) => {
        try {
            await Pharmacy.findByIdAndDelete(req.params.id)
            res.json({ msg: `Pharmacy ${req.params.id} has been deleted.` })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }


}
module.exports = PharmacyCtrl