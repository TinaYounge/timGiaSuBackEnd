const router = require("express").Router();
const authController = require("../Controllers/Auth.controller");
//Register
router.post("/register", authController.register);

//Login
router.post("/login", authController.login);

module.exports = router;
