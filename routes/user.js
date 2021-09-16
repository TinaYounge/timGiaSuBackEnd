const router = require("express").Router();
const userController = require("../Controllers/User.controller");

//Search filter users
router.get("/searchFilterUser", userController.searchFilterUser);
//Get all user
router.get("/teachers", userController.getAllTeachers);
//Get favorite Users
router.get("/favoriteUsers", userController.favoriteUsers);
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
//Add addAvailableTime to user
router.put("/:id/addAvailableTime", userController.addAvailableTime);

module.exports = router;
