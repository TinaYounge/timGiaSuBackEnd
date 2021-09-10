const Subject = require("../models/Subject");

const subjectController = {};
//Get all subjects
subjectController.getAllSubjects = async (req, res, next) => {
  let allSubjects = [];
  try {
    allSubjects = await Subject.find();
    res.status(200).json(allSubjects);
  } catch (err) {
    res.status(403).json("Cant get all subjects");
  }
};
//Get a subject
subjectController.getASubject = async (req, res, next) => {
  let aSubject = [];
  try {
    aSubject = await Subject.find({ _id: req.params.id }).populate("classes");
    res.status(200).json(aSubject);
  } catch (err) {
    res.status(403).json("Cant get a subject");
  }
};
module.exports = subjectController;
