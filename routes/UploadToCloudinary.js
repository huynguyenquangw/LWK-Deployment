const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authDoctor = require('../middleware/authDoctor')
const fs = require('fs')

//Image will be uploaded to cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//Upload image
router.post('/upload', (req, res) => {
    try {
        // console.log(req.files);
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({ msg: 'No files were uploaded.' })

        const file = req.files.file

        //if file size > 1mb
        if (file.size > 1024 * 1024) {
            removeTmpFile(file.tempFilePath)
            return res.status(400).json({ msg: "Size too large." })
        }

        //if file format wrong
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmpFile(file.tempFilePath)
            return res.status(400).json({ msg: 'Incorrect file format.' })
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'lwk' }, async (err, result) => {
            if (err) throw err;

            removeTmpFile(file.tempFilePath)

            res.json({ public_id: result.public_id, url: result.secure_url })
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

//Destroy image
router.post('/destroy', (req, res) => {
    try {
        const { public_id } = req.body
        if (!public_id) return res.status(400).json({ msg: 'No image selected' })

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err

            res.json({ msg: `Image ID: ${public_id} has been deleted.` })
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

const removeTmpFile = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}

module.exports = router