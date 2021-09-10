const router = require("express").Router();
const Subject = require("../models/Subject");

//Get all subject
router.get("/", async (req, res) => {
  let allSubjects = [];
  try {
    allSubjects = await Subject.find();
    res.status(200).json(allSubjects);
  } catch (err) {
    res.status(403).json("Cant get all subjects");
  }
});

//Get a subject
router.get("/:id", async (req, res) => {
  let aSubject = [];
  try {
    aSubject = await Subject.find({ _id: req.params.id });
    res.status(200).json(aSubject);
  } catch (err) {
    res.status(403).json("Cant get a subject");
  }
});
module.exports = router;

//Post a subject
