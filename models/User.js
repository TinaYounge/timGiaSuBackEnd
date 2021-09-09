const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      enum: ["Toán", "Nữ", "Khác"],
      default: "Tiếng Anh",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
