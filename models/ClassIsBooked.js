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
  finished: { type: String, enum: ["Yes", "No", "Refuse"] },
  typeOfTeaching: { type: String, enum: ["Tại nhà", "Trực tuyến"] },
  billId: { type: String },
  reviewFromTeacher: { type: String },
  reviewFromStudent: { type: String },
  teacherAccept: { type: String, enum: ["Yes", "No"] },
  teacherIsPay: { type: String, enum: ["Yes", "No"] },
  linkStudy: { type: String },
  teacherShow: { type: String, enum: ["Yes", "No"] },
  studentShow: { type: String, enum: ["Yes", "No"] },
  studentPlace: { type: String },
  studentPhone: { type: String },
  studentProfilePicture: { type: String },
});

module.exports = mongoose.model("ClassIsBooked", ClassIsBookedSchema);
