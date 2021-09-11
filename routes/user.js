const router = require("express").Router();
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
//Add class to user
router.put("/:id/addClass", userController.addClassToUser);
//Delete a class from user
router.put("/:id/deleteClass", userController.deleteClassToUser);
//Add schedule to user
// router.put("/:id/addClass", userController.addClassToUser);

module.exports = router;
