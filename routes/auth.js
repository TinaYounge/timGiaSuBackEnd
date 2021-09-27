const router = require("express").Router();
const authController = require("../Controllers/Auth.controller");
const { verifyToken } = require("./verifyToken");

//Register
router.post("/register", authController.register);

//Login
router.post("/login", authController.login);

//Login me
router.get("/me", verifyToken, authController.loginMe);

module.exports = router;
