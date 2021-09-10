const router = require("express").Router();
const subjectController = require("../Controllers/Subject.controller");

//Get all subject
router.get("/", subjectController.getAllSubjects);

//Get a subject
router.get("/:id", subjectController.getASubject);

module.exports = router;
