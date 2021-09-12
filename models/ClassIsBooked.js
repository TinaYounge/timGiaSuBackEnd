const mongoose = require("mongoose");
const ClassIsBookedSchema = new mongoose.Schema({
  timeId: { type: String },
  // classId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  classId: { type: String },
  userId: { type: String },
  studentId: { type: String },
  finished: { type: String, enum: ["Yes", "No"] },
  typeOfTeaching: { type: String, enum: ["Online", "Offline"] },
  billId: { type: String },
  reviewfromTeacher: { type: String },
  teacherisPaied: { type: String, enum: ["Yes", "No"] },
});

module.exports = mongoose.model("ClassIsBooked", ClassIsBookedSchema);
