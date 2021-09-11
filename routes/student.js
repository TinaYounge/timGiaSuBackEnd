const router = require("express").Router();
const studentController = require("../Controllers/Student.controller");

//Update Student
router.put("/:id", studentController.updateStudent);
//Delete Student
router.delete("/:id", studentController.deleteStudent);
//Get a Student
router.get("/:id", studentController.getAStudent);
//Follow a teacher
router.put("/:id/follow", studentController.followATeacherByStudent);
//Unfollow a Student
router.put("/:id/unfollow", studentController.unFollowATeacherByStudent);
//Add class to Student
// router.put("/:id/addClass", studentController.addClassToStudent);
//Delete a class from Student
// router.put("/:id/deleteClass", studentController.deleteClassToStudent);

module.exports = router;
