const router = require("express").Router();
const Price = require("../models/Price");

//Get all Price
router.get("/", async (req, res) => {
  let allPrices = [];
  try {
    allPrices = await Price.find();
    res.status(200).json(allPrices);
  } catch (err) {
    res.status(403).json("Cant get all prices");
  }
});

//Get a Price
router.get("/:id", async (req, res) => {
  let aPrice = [];
  try {
    aPrice = await Price.find({ _id: req.params.id });
    res.status(200).json(aPrice);
  } catch (err) {
    res.status(403).json("Cant get a price");
  }
});
module.exports = router;

//Post a Price
