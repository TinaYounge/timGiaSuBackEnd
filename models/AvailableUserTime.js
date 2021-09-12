const mongoose = require("mongoose");
const AvailableUserTimeSchema = new mongoose.Schema({
    day: { type: String}
  // time: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeInADay" }],
});

module.exports = mongoose.model("AvailableUserTime", AvailableUserTimeSchema);
