const Cart = require("../models/Cart");
const ClassIsBooked = require("../models/ClassIsBooked");
const User = require("../models/User");

const classBookedController = {};

//Get all ClassIsBookeds
classBookedController.getAllClassIsBookeds = async (req, res, next) => {
  try {
    const allClassIsBookeds = await ClassIsBooked.aggregate([
      {
        $match: {
          $or: [
            { $and: [{ userId: req.user.id }, { teacherAccept: "Yes" }] },
            { $and: [{ studentId: req.user.id }, { teacherAccept: "Yes" }] },
          ],
        },
      },
      {
        $addFields: {
          date: "$time.day",
        },
      },
      { $sort: { date: 1 } },
    ]);
    // const allClassIsBookeds = await ClassIsBooked.find({
    //   studentId: req.user.id,
    //   teacherAccept: "Yes",
    // });
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
    if (
      classCanBookAfter >= 0 &&
      aUpdateClassIsBooked.teacherAccept === "Yes"
    ) {
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

//Update  a classIsBook and change the class is finished
classBookedController.updateClassIsBookFinished = async (req, res, next) => {
  try {
    const aUpdateClassIsBooked = await ClassIsBooked.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const aClassIsBooked = await ClassIsBooked.findById(req.params.id);
    let reviewFromStudent = {
      studentProfilePicture: aClassIsBooked.studentProfilePicture,
      value: aClassIsBooked.reviewFromStudent,
      studentName: aClassIsBooked.studentFullname,
    };
    const userWithReview = await User.findByIdAndUpdate(
      aClassIsBooked.userId,
      {
        $push: {
          review: reviewFromStudent,
        },
      },
      { new: true }
    );

    res.status(200).json(aUpdateClassIsBooked);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = classBookedController;
