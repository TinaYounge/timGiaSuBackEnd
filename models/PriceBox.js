const mongoose = require("mongoose");
const PriceSchema = new mongoose.Schema({
  Time: {
    type: String,
    enum: [
      "1 X 30 phút",
      "1 X 50 phút",
      "5 X 50 phút",
      "10 X 50 phút",
      "20 X 50 phút",
    ],
    default: "Tiếng Anh",
  },
  class: {
    type: Number,
    default: 20000,
  },
});
module.exports = mongoose.model("Price", PriceSchema);
