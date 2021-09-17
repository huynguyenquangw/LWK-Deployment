const router = require("express").Router();
const medicineCtrl = require("../controllers/MedicineCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

//Add new medicine
router.post("/", auth, authAdmin, medicineCtrl.addMedicine);

//Get all medicine
router.get("/", medicineCtrl.getAllMedicines);

//Delete medicine by id
router.delete("/delete/:id", auth, authAdmin, medicineCtrl.deleteMedicineByID);

module.exports = router;
