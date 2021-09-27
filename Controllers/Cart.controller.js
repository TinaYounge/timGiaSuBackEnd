const Cart = require("../models/Cart");

const cartController = {};

//Get all Carts
cartController.getAllCartsPaidOfStudent = async (req, res, next) => {
  try {
    const allCarts = await Cart.find({
      $and: [{ studentId: req.user.id }, { paid: "Yes" }],
    });
    res.status(200).json(allCarts);
  } catch (err) {
    res.status(403).json("Cant get all Carts");
  }
};
//Get a Cart
cartController.getACart = async (req, res, next) => {
  let aCart = [];
  try {
    aCart = await Cart.find({
      _id: req.params.id,
    });
    res.status(200).json(aCart);
  } catch (err) {
    res.status(403).json("Cant get a Cart");
  }
};

//Paid a Cart(class)
cartController.paidACart = async (req, res, next) => {
  try {
    //update Cart(class)
    const updateCart = await Cart.updateMany(
      {
        $and: [{ studentId: req.user.id }, { paid: "No" }],
      },
      {
        $set: {
          paid: "Yes",
        },
      }
    );
    console.log("updateCart", updateCart);
    res.status(200).json(updateCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = cartController;
