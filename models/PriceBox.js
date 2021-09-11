const mongoose = require("mongoose");
const PriceBoxSchema = new mongoose.Schema({
  time: {
    type: String,
    enum: ["30 phút", "50 phút"],
    default: "30 phút",
  },
  numberOfLesson: {
    type: Number,
    enum: [1, 5, 10, 15, 20],
    default: 1,
  },
  price: {
    type: Number,
    default: 60000,
  },
});

module.exports = mongoose.model("PriceBox", PriceBoxSchema);
