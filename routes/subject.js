const router = require("express").Router();
const subjectController = require("../Controllers/Subject.controller");

//Get all subject
router.get("/", subjectController.getAllSubjects);
//Get filter subject
router.get("/getFilterSubjects", subjectController.getFilterSubjects);

//Get a subject
router.get("/:id", subjectController.getASubject);

//Add a subject
router.post("/addASubject", subjectController.addASubject);
module.exports = router;
