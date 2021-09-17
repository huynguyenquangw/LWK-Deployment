const router = require('express').Router()
const HealthDeclarationCtrl = require('../controllers/HealthDeclarationCtrl')
const auth = require('../middleware/auth')
const authDoctor = require('../middleware/authDoctor')

//Create a health declaration form
router.post('/add', auth, HealthDeclarationCtrl.add)

//Get Health Declaration for patient
router.get('/user', auth, HealthDeclarationCtrl.getHealthDeclarationForPatient)

//Get Health Declaration for doctor
router.get('/doctor', authDoctor, HealthDeclarationCtrl.getHealthDeclarationForDoctor)

//Get all Health declarations
router.get('/', HealthDeclarationCtrl.getAllHealthDeclaration)

//Update Health Declaration by id
router.put('/update/:id', auth, HealthDeclarationCtrl.updateHealthDeclarationByID)

//Update medicine for health declaration by id
router.put('/update/medicine/:id', authDoctor, HealthDeclarationCtrl.updateMedicineForHealthDeclaration)

//Delete by Health Declaration id
router.delete('/delete/:id', auth, HealthDeclarationCtrl.deleteHealthDeclarationByID)

module.exports = router