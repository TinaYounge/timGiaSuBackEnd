const router = require("express").Router();
const cartController = require("../Controllers/Cart.controller");
const { verifyToken } = require("./verifyToken");

//Get all getAllCartsPaidOfStudent
router.get("/getAllCartsPaidOfStudent",verifyToken, cartController.getAllCartsPaidOfStudent);

//Get a cart
router.get("/:id", cartController.getACart);

//Add a cart
router.put("/updateCart", verifyToken, cartController.paidACart);
module.exports = router;
