const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//Get all user
router.get("/teachers", async (req, res) => {
  let allTeacher = [];
  try {
    allTeacher = await User.find({ accountType: "Gia sư" });
    res.status(200).json(allTeacher);
  } catch (err) {
    res.status(403).json("Cant get all user");
  }
});
//Update user
router.put("/:id", async (req, res) => {
  // if (req.body.userId === req.params.id || req.body.isAdmin) {
  // if (req.body.password) {
  //   try {
  //     const salt = await bcrypt.genSalt(10);
  //     req.body.password = await bcrypt.hash(req.body.password, salt);
  //   } catch (err) {
  //     return res.status(500).json(err);
  //   }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
  //   } else {
  //     return res.status(403).json("you can update only on your account");
  //   }
  // }
});
//Delete user
router.delete("/:id", async (req, res) => {
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
});
//Get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});
//Follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userID)) {
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
});
//Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
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
});

module.exports = router;
