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
    ],
    default: "Tiếng Anh",
    require: true,
  },
  grade: {
    type: String,
    enum: [
      "Lớp 1",
      "Lớp 2",
      "Lớp 3",
      "Lớp 4",
      "Lớp 5",
      "Lớp 6",
      "Lớp 7",
      "Lớp 8",
      "Lớp 8",
      "Lớp 10",
      "Lớp 11",
      "Lớp 12",
      "Ielts",
      "Toiec",
      "Khác",
    ],
    require: true,
    default: "Lớp 5",
  },
  fullPackage: [
    {
      idPrice: { type: String, enum: ["30", "50", "5x50", "10x50"] },
      value: { type: Number },
    },
  ],
});
module.exports = mongoose.model("Subject", SubjectSchema);
