const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, min: 3, max: 20, unique: true },
    fullname: { type: String, max: 30 },
    email: { type: String, require: true, max: 50, unique: true },
    password: { type: String, required: true, min: 6 },
    profilePicture: { type: String, default: "" },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    district: { type: String, default: "Quận 10" },
    city: { type: String, default: "Ho Chi Minh" },
    sex: { type: String, enum: ["Nam", "Nữ", "Khác"], default: "Nam" },
    accountType: {
      type: String,
      enum: ["Học sinh"],
      default: "Học sinh",
    },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
    classIsBooked: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ClassIsBooked" },
    ],
    packageIsBought: { type: Array, default: [] },

    typeOfStudying: {
      type: String,
      enum: ["Trực tuyến", "Tại Nhà", "Cả hai"],
      default: "Cả hai",
    },
    phoneNumber: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Student", StudentSchema);
