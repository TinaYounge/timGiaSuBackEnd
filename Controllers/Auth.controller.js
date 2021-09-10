const User = require("../models/User");
const bcrypt = require("bcrypt");

const authController = {};

//Register
authController.register = async (req, res, next) => {
  try {
    //Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //Save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

//Login
authController.login = async (req, res, next) => {
  try {
    //check email
    const user = await User.findOne({
      email: req.body.email,
    });
    !user && res.status(404).json("user not found");
    //check password

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (validPassword) {
      res.status(200).json(user);
    } else {
      res.status(404).json("Password is not right");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = authController;
