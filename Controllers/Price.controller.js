const PriceBox = require("../models/PriceBox");

const priceController = {};
//Get all Prices
priceController.getAllPrice = async (req, res, next) => {
  let allPrices = [];
  try {
    allPrices = await PriceBox.find();
    res.status(200).json(allPrices);
  } catch (err) {
    res.status(403).json("Cant get all prices");
  }
};

//Get a price
priceController.getAPrice = async (req, res, next) => {
  let aPrice = [];
  try {
    aPrice = await PriceBox.find({ _id: req.params.id }).populate("prices");
    res.status(200).json(aPrice);
  } catch (err) {
    res.status(403).json("Cant get a price");
  }
};
//Add classId to pricebox

module.exports = priceController;
