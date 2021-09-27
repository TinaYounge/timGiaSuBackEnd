const mongoose = require("mongoose");
const ClassIsBookedSchema = new mongoose.Schema({
  // timeId: { type: String },
  time: {
    day: { type: Date },
    timeId: { type: String },
  },
  // classId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  classId: { type: String },
  subject: { type: String },
  userId: { type: String },
  studentId: { type: String },
  finished: { type: String, enum: ["Yes", "No"] },
  typeOfTeaching: { type: String, enum: ["Tại Nhà", "Trực tuyến"] },
  billId: { type: String },
  reviewFromTeacher: { type: String },
  teacherAccept: { type: String, enum: ["Yes", "No"] },
  teacherIsPay: { type: String, enum: ["Yes", "No"] },
  linkStudy: { type: String },
});

module.exports = mongoose.model("ClassIsBooked", ClassIsBookedSchema);
