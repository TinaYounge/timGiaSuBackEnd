const mongoose = require("mongoose");
const SubjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    enum: ["Toán", "Lý", "Hóa", "Tiếng Anh", "Văn"],
    default: "Tiếng Anh",
  },
  class: {
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
    default: "Lớp 5",
  },
  picture: {
    type: String,
    default:
      "https://i.pinimg.com/564x/9f/9e/8d/9f9e8dc7787fabf094581ce56e83647a.jpg",
  },
});
module.exports = mongoose.model("Subject", SubjectSchema);
