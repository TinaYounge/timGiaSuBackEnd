const router = require("express").Router();
const authStudentController = require("../Controllers/Auth.student.controller");
const { verifyToken } = require("./verifyToken");
//Register
router.post("/register", authStudentController.register);

//Login
router.post("/login", authStudentController.login);

//Login me
router.get("/me", verifyToken, authStudentController.loginMe);
module.exports = router;
