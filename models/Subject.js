const mongoose = require("mongoose");
const SubjectSchema = new mongoose.Schema({
  userId: { type: String },
  subject: {
    type: String,
    enum: [
      "Toán",
      "Lý",
      "Hóa",
      "Tiếng Anh",
      "Văn",
      "Tiếng Nhật",
      "Piano",
      "Hát nhạc",
      "Hội họa",
      "Tiếng Pháp",
      "Lập Trình",
    ],
    default: "Tiếng Anh",
    require: true,
  },
  grade: {
    type: String,
  },
  fullPackage: [
    {
      idPrice: { type: String, enum: ["30", "50", "5x50", "10x50"] },
      value: { type: Number },
    },
  ],
});
module.exports = mongoose.model("Subject", SubjectSchema);
