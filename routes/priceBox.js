const router = require("express").Router();
const priceController = require("../Controllers/Price.controller");

//Get all Price
router.get("/", priceController.getAllPrice);

// Get a Price
router.get("/:id", priceController.getAPrice);

module.exports = router;
