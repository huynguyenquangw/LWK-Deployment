const router = require("express").Router();
const cityCtrl = require("../controllers/CityCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

//Add new city
router.post("/", auth, authAdmin, cityCtrl.addCity);

//Get all city
router.get("/", cityCtrl.getAllCities);

//Delete city by id
router.delete("/delete/:id", auth, authAdmin, cityCtrl.deleteCityByID);

module.exports = router;
