const router = require("express").Router();
const cartController = require("../Controllers/Cart.controller");

//Get all cart
router.get("/", cartController.getAllCarts);

//Get a cart
router.get("/:id", cartController.getACart);

//Add a cart
router.post("/addCart", cartController.addACart);
module.exports = router;
