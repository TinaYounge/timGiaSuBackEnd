const Cart = require("../models/Cart");

const cartController = {};

//Get all Carts
cartController.getAllCarts = async (req, res, next) => {
  try {
    const allCarts = await Cart.find();
    res.status(200).json(allCarts);
  } catch (err) {
    res.status(403).json("Cant get all Carts");
  }
};
//Get a Cart
cartController.getACart = async (req, res, next) => {
  let aCart = [];
  try {
    // aCart = await Cart.find({ _id: req.params.id });
    aCart = await Cart.find({
      _id: req.params.id,
    });
    res.status(200).json(aCart);
  } catch (err) {
    res.status(403).json("Cant get a Cart");
  }
};

//Add a Cart(class)
cartController.addACart = async (req, res, next) => {
  try {
    //create new Cart(class)
    const newCart = new Cart({
      classId: req.body.classId,
      idPrice: req.body.idPrice,
      value: req.body.value,
      paid: req.body.paid,
    });
    //Save Cart and respond
    const cart = await newCart.save();
    res.status(200).json("Cart is added");
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = cartController;
