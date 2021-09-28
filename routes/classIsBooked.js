const classBookedController = require("../Controllers/ClassIsBooked.controller");
const { verifyToken } = require("./verifyToken");
const router = require("express").Router();

//Get all class is booked
router.get(
  "/teacherAccept",
  verifyToken,
  classBookedController.getAllClassIsBookeds
);

//Get a class is booked
router.get("/:id", classBookedController.getAClassIsBooked);
//Update a class is booked
router.put("/:id/updateClassIsBook", classBookedController.updateClassIsBook);
//Update a class is booked is Finished
router.put(
  "/:id/updateClassIsBookFinished",
  classBookedController.updateClassIsBookFinished
);
//Add a class is booked
router.post("/addAclassIsBooked", classBookedController.addAClassIsBooked);

module.exports = router;
