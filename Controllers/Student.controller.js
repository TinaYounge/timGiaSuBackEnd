const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Cart = require("../models/Cart");
const ClassIsBooked = require("../models/ClassIsBooked");

const studentController = {};

//Update a student
studentController.updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
//Delete a student
studentController.deleteStudent = async (req, res, next) => {
  if (req.body.studentId === req.params.id || req.body.isAdmin === "true") {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
      try {
        const student = await Student.findByIdAndDelete(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("delete account");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("you can delete only on your account");
    }
  }
};
//Get a student
studentController.getAStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("cart")
      .populate("classIsBooked");
    res.status(200).json(student);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//Follow a teacher from student
studentController.followATeacherByStudent = async (req, res, next) => {
  const id = req.user.id;
  if (req.body.userId !== id) {
    try {
      const student = await Student.findById(id);
      const currentUser = await User.findById(req.body.userId);
      if (!student.followers.includes(req.body.userId)) {
        await student.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({
          $push: { followings: id },
        });
        res.status(200).json("user has been followed");
      } else {
        return res.status(401).json("person you did follow before");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
};
//Unfollow a teacher from student
studentController.unFollowATeacherByStudent = async (req, res, next) => {
  const id = req.user.id;

  if (req.body.userId !== id) {
    try {
      const student = await Student.findById(id);
      const currentUser = await User.findById(req.body.userId);
      if (student.followers.includes(req.body.userId)) {
        await student.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({
          $pull: { followings: id },
        });
        res.status(200).json("user has been unfollowed");
      } else {
        return res.status(401).json("person you did not followed before");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
};

// Add cart to student
studentController.addCartToStudent = async (req, res, next) => {
  const newCart = new Cart({
    studentId: req.user.id,
    classId: req.body.classId,
    idPrice: req.body.idPrice,
    value: req.body.value,
    paid: req.body.paid,
    userId: req.body.userId,
    subject: req.body.subject,
    classCanBook: req.body.classCanBook,
  });
  const cart = await newCart.save();
  try {
    let id = req.user.id;
    const teacher = await User.findById(req.body.userId);
    await teacher.updateOne({ $push: { cart: newCart } });
    const student = await Student.findById(id);
    await student.updateOne({ $push: { cart: newCart } });
    res.status(200).json(student);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Add class is booked to student
studentController.addClassIsBookedToStudent = async (req, res, next) => {
  let id = req.user.id;
  const student = await Student.findById(id);
  const newClassIsBooked = new ClassIsBooked({
    studentId: req.user.id,
    time: {
      day: req.body.day,
      timeId: req.body.timeId,
    },
    classId: req.body.classId,
    userId: req.body.userId,
    finished: req.body.finished,
    typeOfTeaching: req.body.typeOfTeaching,
    billId: req.body.billId,
    subject: req.body.subject,
    reviewFromTeacher: req.body.reviewFromTeacher,
    teacherAccept: req.body.teacherAccept,
    teacherIsPay: req.body.teacherIsPay,
    linkStudy: req.body.linkStudy,
    studentPlace:
      student.address + ", " + student.district + ", " + student.city,
    studentPhone: student.phoneNumber,
    studentProfilePicture: student.profilePicture,
    studentFullname: student.fullname,
  });
  const classIsBooked = await newClassIsBooked.save();

  try {
    const teacher = await User.findById(req.body.userId);
    await teacher.updateOne({ $push: { classIsBooked: newClassIsBooked } });
    await student.updateOne({ $push: { classIsBooked: newClassIsBooked } });

    res.status(200).json(student);
  } catch (err) {
    return res.status(500).json(err);
  }
};
module.exports = studentController;
