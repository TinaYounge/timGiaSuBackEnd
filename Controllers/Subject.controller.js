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
    // aSubject = await Subject.find({ _id: req.params.id });
    aSubject = await Subject.find({ _id: req.params.id });
    res.status(200).json(aSubject);
  } catch (err) {
    res.status(403).json("Cant get a subject");
  }
};

//Get filter subjects
subjectController.getFilterSubjects = async (req, res, next) => {
  let { page, limit, subjectFilter} = req.query;
  if (!page) {
    page = 1;
  }
  if (!limit) {
    limit = 8;
  }
  page = parseInt(page);
  limit = parseInt(limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let allSubjects = [];
  try {
    allSubjects = await Subject.aggregate([
      { $match:{ $and:[{ subject: subjectFilter }] }},
    ]);
    res.status(200).json(allSubjects.slice(startIndex, endIndex));
  } catch (err) {
    console.log("rer", err);
    res.status(403).json("Cant get all subjects");
  }
};
//Add a subject(class)
subjectController.addASubject = async (req, res, next) => {
  try {
    //create new subject(class)
    const newSubject = new Subject({
      subject: req.body.subject,
      grade: req.body.grade,
    });
    //Save subject and respond
    const subject = await newSubject.save();
    res.status(200).json("Subject is added");
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = subjectController;
