const Cart = require("../models/Cart");
const ClassIsBooked = require("../models/ClassIsBooked");

const classBookedController = {};

//Get all ClassIsBookeds
classBookedController.getAllClassIsBookeds = async (req, res, next) => {
  try {
    const allClassIsBookeds = await ClassIsBooked.aggregate([
      {
        $match: {
          $and: [{ studentId: req.user.id }, { teacherAccept: "Yes" }],
        },
      },
      { $sort: { day: 1 } },
    ]);
    // const allClassIsBookeds = await ClassIsBooked.find({
    //   studentId: req.user.id,
    //   teacherAccept: "Yes",
    // });
    console.log("allClassIsBookeds", allClassIsBookeds);
    res.status(200).json(allClassIsBookeds);
  } catch (err) {
    res.status(403).json("Cant get all ClassIsBookeds");
  }
};
//Get a ClassIsBooked
classBookedController.getAClassIsBooked = async (req, res, next) => {
  let aClassIsBooked = [];
  try {
    aClassIsBooked = await ClassIsBooked.find({ _id: req.params.id });
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

//Update  a classIsBook and change the class can book in cart
classBookedController.updateClassIsBook = async (req, res, next) => {
  let teacherAccept = req.body.teacherAccept;
  try {
    const aUpdateClassIsBooked = await ClassIsBooked.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const aUpdateCart = await Cart.findById(aUpdateClassIsBooked.billId);
    const classCanBookBefore = aUpdateCart.classCanBook;
    const classCanBookAfter = classCanBookBefore - 1;
    if (classCanBookAfter >= 0) {
      const aClassCanBookAfter = await Cart.findByIdAndUpdate(
        aUpdateClassIsBooked.billId,
        {
          $set: { classCanBook: classCanBookAfter },
        },
        { new: true }
      );
    } else {
      res.status(403).json("Đã quá buổi học có thể đặt");
    }
    res.status(200).json(aUpdateClassIsBooked);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = classBookedController;
