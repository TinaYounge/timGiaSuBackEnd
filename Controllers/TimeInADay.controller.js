const TimeInADay = require("../models/TimeInADay");

const timeInADayController = {};

//Get all TimeInADays
timeInADayController.getAllTimeInADays = async (req, res, next) => {
  let allTimeInADays = [];
  try {
    allTimeInADays = await TimeInADay.find();
    res.status(200).json(allTimeInADays);
  } catch (err) {
    res.status(403).json("Cant get all TimeInADays");
  }
};
//Get a TimeInADay
timeInADayController.getATimeInADay = async (req, res, next) => {
  let aTimeInADay = [];
  try {
    // aTimeInADay = await TimeInADay.find({ _id: req.params.id });
    aTimeInADay = await TimeInADay.find({ _id: req.params.id }).populate("classes");
    res.status(200).json(aTimeInADay);
  } catch (err) {
    res.status(403).json("Cant get a TimeInADay");
  }
};

//Add a TimeInADay(class)
timeInADayController.addATimeInADay = async (req, res, next) => {
  try {
    //create new TimeInADay(class)
    const newTimeInADay = new TimeInADay({
      TimeInADay: req.body.TimeInADay,
      grade: req.body.grade,
    });
    //Save TimeInADay and respond
    const TimeInADay = await newTimeInADay.save();
    res.status(200).json("TimeInADay is added");
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = timeInADayController;
