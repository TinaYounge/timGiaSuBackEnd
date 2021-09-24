const AvailableUserTime = require("../models/AvailableUserTime");

const availableUserTimeController = {};

//Get all AvailableUserTimes
availableUserTimeController.getAllAvailableUserTimes = async (
  req,
  res,
  next
) => {
  try {
    const allAvailableUserTimes = await AvailableUserTime.find();
    res.status(200).json(allAvailableUserTimes);
  } catch (err) {
    res.status(403).json("Cant get all AvailableUserTimes");
  }
};
//Get a AvailableUserTime
availableUserTimeController.getAAvailableUserTime = async (req, res, next) => {
  try {
    // aAvailableUserTime = await AvailableUserTime.find({ _id: req.params.id });
    let aAvailableUserTime = await AvailableUserTime.find({
      _id: req.params.id,
    });
    res.status(200).json(aAvailableUserTime);
  } catch (err) {
    res.status(403).json("Cant get a AvailableUserTime");
  }
};

//Add a AvailableUserTime(class)
availableUserTimeController.addAAvailableUserTime = async (req, res, next) => {
  try {
    //create new AvailableUserTime(class)
    const newAvailableUserTime = new AvailableUserTime({
      day: req.body.day,
    });
    //Save AvailableUserTime and respond
    const availableUserTime = await newAvailableUserTime.save();
    res.status(200).json("AvailableUserTime is added");
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = availableUserTimeController;
