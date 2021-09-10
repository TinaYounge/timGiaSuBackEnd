const router = require("express").Router();
const bcrypt = require("bcrypt");
const userController = require("../Controllers/User.controller");
//Get all user
router.get("/teachers", userController.getAllTeachers);
//Update user
router.put("/:id", userController.updateUser);
//Delete user
router.delete("/:id", userController.deleteUser);
//Get a user
router.get("/:id", userController.getAUser);
//Follow a user
router.put("/:id/follow", userController.followAUser);
//Unfollow a user
router.put("/:id/unfollow", userController.unfollowAUser);

module.exports = router;
