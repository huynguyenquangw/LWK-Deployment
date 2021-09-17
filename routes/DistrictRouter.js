const router = require("express").Router();
const districtCtrl = require("../controllers/DistrictCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

//Add new district
router.post("/", auth, authAdmin, districtCtrl.addDistrict);

//Get all district
router.get("/", districtCtrl.getAllDistricts);

//Delete city by id
router.delete("/delete/:id", auth, authAdmin, districtCtrl.deleteDistrictByID);

module.exports = router;
