const User = require("../models/User");
const bcrypt = require("bcrypt");

const userController = {};
//Get all teachers
userController.getAllTeachers = async (req, res, next) => {
  let allTeacher = [];
  try {
    allTeacher = await User.find({ accountType: "Gia sư" });
    res.status(200).json(allTeacher);
  } catch (err) {
    res.status(403).json("Cant get all user");
  }
};

//Update a user
userController.updateUser = async (req, res, next) => {
  // if (req.body.userId === req.params.id || req.body.isAdmin) {
  // if (req.body.password) {
  //   try {
  //     const salt = await bcrypt.genSalt(10);
  //     req.body.password = await bcrypt.hash(req.body.password, salt);
  //   } catch (err) {
  //     return res.status(500).json(err);
  //   }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
  //   } else {
  //     return res.status(403).json("you can update only on your account");
  //   }
  // }
};
//Delete a user
userController.deleteUser = async (req, res, next) => {
  if (req.body.userId === req.params.id || req.body.isAdmin === "true") {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
      try {
        const user = await User.findByIdAndDelete(req.params.id, {
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
//Get a user
userController.getAUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("classes");
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};
//Follow a user
userController.followAUser = async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        return res.status(401).json("person you did follow");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
};
//Unfollow a user
userController.unfollowAUser = async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userID)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        return res.status(401).json("person you did not follow");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
};

//Delete a class to user
userController.deleteClassToUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.classes.includes(req.body.classId)) {
      await user.updateOne({ $pull: { classes: req.body.classId } });
      res.status(200).json("classId is deleted");
    } else {
      return res.status(401).json("class you have not added before");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
//Add class to user
userController.addClassToUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user.classes.includes(req.body.classId)) {
      await user.updateOne({ $push: { classes: req.body.classId } });
      res.status(200).json("classId is added");
    } else {
      return res.status(401).json("class you already add before");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
module.exports = userController;
