const ClassIsBooked = require("../models/ClassIsBooked");

const classBookedController = {};

//Get all ClassIsBookeds
classBookedController.getAllClassIsBookeds = async (req, res, next) => {
  let allClassIsBookeds = [];
  try {
    allClassIsBookeds = await ClassIsBooked.find();
    res.status(200).json(allClassIsBookeds);
  } catch (err) {
    res.status(403).json("Cant get all ClassIsBookeds");
  }
};
//Get a ClassIsBooked
classBookedController.getAClassIsBooked = async (req, res, next) => {
  let aClassIsBooked = [];
  try {
    // aClassIsBooked = await ClassIsBooked.find({ _id: req.params.id });
    aClassIsBooked = await ClassIsBooked.find({ _id: req.params.id }).populate(
      "classIsBooked"
    );
    res.status(200).json(aClassIsBooked);
  } catch (err) {
    res.status(403).json("Cant get a ClassIsBooked");
  }
};

//Add a ClassIsBooked(class)
classBookedController.addAClassIsBooked = async (req, res, next) => {
  try {
    //create new ClassIsBooked(class)
    const newClassIsBooked = new ClassIsBooked({
      timeId: req.body.timeId,
      classId: req.body.classId,
    });
    //Save ClassIsBooked and respond
    const classIsBooked = await newClassIsBooked.save();
    res.status(200).json("ClassIsBooked is added");
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = classBookedController;
