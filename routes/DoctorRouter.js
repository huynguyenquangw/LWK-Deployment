const router = require("express").Router();
const doctorCtrl = require("../controllers/DoctorCtrl");
const authDoctor = require("../middleware/authDoctor");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

//Authentication and Authorization
router.post("/register", auth, authAdmin, doctorCtrl.register);

router.post("/login", doctorCtrl.login);

router.get("/logout", doctorCtrl.logout);

router.get("/refresh_token", doctorCtrl.refreshToken);

router.get("/info", authDoctor, doctorCtrl.getDoctor);

//Get all doctor
router.get("/", doctorCtrl.getAllDoctor);

//Delete doctor by id
router.delete("/delete/:id", auth, authAdmin, doctorCtrl.deleteDoctorByID);

//Update doctor by token
router.put("/update", authDoctor, doctorCtrl.updateDoctorByID);

router.put("/update/img", authDoctor, doctorCtrl.updateDoctorImgByID);

router.put("/update/certificate", authDoctor, doctorCtrl.updateDoctorCertificateByID);

//Update patient password by token
router.put("/updatepw", authDoctor, doctorCtrl.updateDoctorPasswordByID);

module.exports = router;
