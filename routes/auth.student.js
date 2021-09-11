const router = require("express").Router();
const authStudentController = require("../Controllers/Auth.student.controller");
//Register
router.post("/register", authStudentController.register);

//Login
router.post("/login", authStudentController.login);
module.exports = router;
