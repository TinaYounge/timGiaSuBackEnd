const User = require("../models/User");
const bcrypt = require("bcrypt");

const userController = {};
// function paginationResult(model) {
//   return async (req, res, next) => {
//     const page = parseInt(req.query.page);
//     const limit = parseInt(req.query.limit);
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     const results = {};
//     if (endIndex < model.length) {
//       results.next = {
//         page: page + 1,
//         limit: limit,
//       };
//     }
//     if (startIndex > 0) {
//       results.previous = {
//         page: page - 1,
//         limit: limit,
//       };
//     }
//     results.results = model.slice(startIndex, endIndex);
//     res.paginationResult = results;
//     next();
//   };
// }
// Get all teachers
userController.getAllTeachers = async (req, res, next) => {
  let { page, limit } = req.query;

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
  try {
    const allTeacher = await User.find({
      accountType: "Gia sư",
    });
    res.status(200).json(allTeacher.slice(startIndex, endIndex));
  } catch (err) {
    res.status(403).json("Cant get all user");
  }
};

//Search filter users
userController.searchFilterUser = async (req, res, next) => {
  let { page, limit, cityFilter, typeOfTeachingFilter } = req.query;
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
  if ((typeOfTeachingFilter = "Cả hai")) {
    try {
      const allTeacher = await User.find({
        city: cityFilter,
      });
      res.status(200).json(allTeacher.slice(startIndex, endIndex));
    } catch (err) {
      res.status(403).json("Check");
    }
  }

  try {
    const allTeacher = await User.find({
      city: cityFilter,
      typeOfTeaching: typeOfTeachingFilter,
    });
    res.status(200).json(allTeacher.slice(startIndex, endIndex));
  } catch (err) {
    res.status(403).json("Cant get all user");
  }
};
//Get favorite Users
userController.favoriteUsers = async (req, res, next) => {
  let { page, limit } = req.query;
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
  console.log("hahah");

  try {
    const favUser = await User.aggregate([
      {
        $project: {
          avgScore: {
            $avg: "$vote",
          },
          fullname: "$fullname",
          profilePicture: "$profilePicture",
        },
      },
      {
        $sort: {
          avgScore: -1,
        },
      },
    ]);
    res.status(200).json(favUser.slice(startIndex, endIndex));
  } catch (err) {
    console.log("err", err);
    res.status(403).json(err);
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
    const user = await User.findById(req.params.id)
      .populate("availableTime")
      .populate("classIsBooked")
      .populate("classes");
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
//Add AvailableTime to user
userController.addAvailableTime = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user.availableTime.includes(req.body.availableTimeId)) {
      await user.updateOne({
        $push: { availableTime: req.body.availableTimeId },
      });
      res.status(200).json("AvailableUserTimeId is added");
    } else {
      return res.status(401).json("AvailableUserTimeId you already add before");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = userController;
