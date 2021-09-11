const mongoose = require("mongoose");
const SubjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    enum: ["Toán", "Lý", "Hóa", "Tiếng Anh", "Văn"],
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
  // prices: [{ type: mongoose.Schema.Types.ObjectId, ref: "PriceBox" }],
  price30: { type: Number, default: 30000, require: true },
  price50: { type: Number, default: 100000, require: true },
  price5X50: { type: Number, default: 450000, require: true },
  price10x50: { type: Number, default: 4000000, require: true },
  picture: {
    type: String,
    default:
      "https://i.pinimg.com/564x/9f/9e/8d/9f9e8dc7787fabf094581ce56e83647a.jpg",
  },
});
module.exports = mongoose.model("Subject", SubjectSchema);
