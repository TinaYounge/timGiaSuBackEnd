const router = require("express").Router();
const availableUserTimeController = require("../Controllers/AvailableUserTime.controller");

//Get all subject
router.get("/", availableUserTimeController.getAllAvailableUserTimes);

//Get a subject
router.get("/:id", availableUserTimeController.getAAvailableUserTime);

//Add a subject
router.post("/addAvailableTime", availableUserTimeController.addAAvailableUserTime);
module.exports = router;
