const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, min: 3, max: 20, unique: true },
    fullname: { type: String, max: 30 },
    email: { type: String, require: true, max: 50, unique: true },
    password: { type: String, required: true, min: 6 },
    profilePicture: { type: String, default: "" },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    desc: { type: String, max: 500, default: "Tôi là môt.." },
    district: { type: String, default: "Quận 10" },
    city: { type: String, default: "Ho Chi Minh" },
    sex: { type: String, enum: ["Nam", "Nữ", "Khác"], default: "Nam" },
    accountType: {
      type: String,
      enum: ["Gia sư", "Học sinh"],
      default: "Gia sư",
    },
    company: { type: String, max: 200, default: "Trường THPT Thủ Đức" },

    typeOfTeaching: {
      type: String,
      enum: ["Trực tuyến", "Tại Nhà", "Cả hai"],
      default: "Cả hai",
    },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    phoneNumber: { type: Number },
    teachingPrice: { type: Array, default: [] },
    timeTable: { type: Array, default: [] },
    certificate: { type: Array, default: [] },
    bankCard: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
