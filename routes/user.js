const router = require("express").Router();
const userController = require("../Controllers/User.controller");
const { verifyTokenAndAuthorization, verifyToken } = require("./verifyToken");

//Search filter users
router.get("/searchFilterUser", userController.searchFilterUser);
//Get all user
router.get("/teachers", userController.getAllTeachers);
//Get favorite Users
router.get("/favoriteUsers", userController.favoriteUsers);
//Get filter user
router.get("/getFilterUser", userController.getFilterUser);
//Update user
router.put("/:id", userController.updateUser);
//Delete user
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);
//Get a user
router.get("/:id", userController.getAUser);
//Get a user by own teacher
router.get("/", verifyToken, userController.getAUserByOwnTeacher);

router.put(
  "/:id/follow",
  verifyTokenAndAuthorization,
  userController.followAUser
);
//Unfollow a user
router.put(
  "/:id/unfollow",
  verifyTokenAndAuthorization,
  userController.unfollowAUser
);
//Add class to user
router.put("/:id/addClass", userController.addClassToUser);
//Delete a class from user
router.put("/:id/deleteClass", userController.deleteClassToUser);
//Add addAvailableTime to user
router.put("/:id/addAvailableTime", userController.addAvailableTime);

module.exports = router;
