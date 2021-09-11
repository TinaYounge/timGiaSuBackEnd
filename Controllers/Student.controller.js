const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const studentController = {};

//Update a student
studentController.updateStudent = async (req, res, next) => {
  // if (req.body.userId === req.params.id || req.body.isAdmin) {
  // if (req.body.password) {
  //   try {
  //     const salt = await bcrypt.genSalt(10);
  //     req.body.password = await bcrypt.hash(req.body.password, salt);
  //   } catch (err) {
  //     return res.status(500).json(err);
  //   }
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
  //   } else {
  //     return res.status(403).json("you can update only on your account");
  //   }
  // }
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
    const student = await Student.findById(req.params.id);
    res.status(200).json(student);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//Follow a teacher from student
studentController.followATeacherByStudent = async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const student = await Student.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!student.followers.includes(req.body.userId)) {
        await student.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({
          $push: { followings: req.params.id },
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
  if (req.body.userId !== req.params.id) {
    try {
      const student = await Student.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (student.followers.includes(req.body.userId)) {
        await student.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({
          $pull: { followings: req.params.id },
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
//Add class to user
// studentController.addClassToUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user.classes.includes(req.body.classId)) {
//       await user.updateOne({ $push: { classes: req.body.classId } });
//       res.status(200).json("classId is added");
//     } else {
//       return res.status(401).json("class you already add before");
//     }
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };
module.exports = studentController;
