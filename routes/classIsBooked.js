const classBookedController = require("../Controllers/ClassIsBooked.controller");
const router = require("express").Router();

//Get all class is booked
router.get("/", classBookedController.getAClassIsBooked);

//Get a class is booked
router.get("/:id", classBookedController.getAClassIsBooked);

//Add a class is booked
router.post("/addAclassIsBooked", classBookedController.addAClassIsBooked);
module.exports = router;
