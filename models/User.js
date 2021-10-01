const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, min: 3, max: 20, unique: true },
    fullname: { type: String, max: 30 },
    email: { type: String, require: true, max: 50, unique: true },
    prePassWord: { type: String },
    password: { type: String, required: true, min: 6 },
    profilePicture: {
      type: String,
      default: "https://dummyimage.com/268x180/786978/2a2c40&text=Timgiasu",
    },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    descLong: {
      type: String,
      max: 300,
      default: "Mình có kinh nghiệm dạy lâu năm, yêu nghề",
    },
    desc: { type: String, max: 200, default: "Tôi là môt.." },
    district: { type: String, default: "Quận 10" },
    city: { type: String, default: "Hồ Chi Minh" },
    sex: { type: String, enum: ["Nam", "Nữ", "Khác"], default: "Nam" },
    birthday: { type: String },
    accountType: {
      type: String,
      enum: ["Gia sư"],
      default: "Gia sư",
    },
    highestCertificate: {
      type: String,
      enum: ["Cao đẳng", "Đại học", "Thạc sĩ", "Tiến sĩ"],
    },
    universityGotCert: {
      type: String,
      max: 200,
    },

    company: { type: String, max: 200, default: "Trường THPT Thủ Đức" },
    typeOfTeaching: {
      type: String,
      enum: ["Trực tuyến", "Tại Nhà", "Cả hai"],
      default: "Cả hai",
    },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],

    phoneNumber: { type: Number },
    availableTime: [
      { type: mongoose.Schema.Types.ObjectId, ref: "AvailableUserTime" },
    ],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],

    classIsBooked: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ClassIsBooked" },
    ],
    vote: { type: Array, default: [] },
    review: [
      {
        studentProfilePicture: { type: String },
        value: { type: String },
        studentName: { type: String },
      },
    ],
    youtube: {
      type: Array,
      default: "https://www.youtube.com/embed/es7XtrloDIQ",
    },
    certificate: { type: Array, default: [] },
    bankCard: { type: String },
    AdminChecked: {
      type: String,
      enum: ["Đạt", "Không đạt"],
      default: "Đạt",
    },
    dayCreated: { type: Array },
  },
  { timestamps: true }
);
module.exports = mongoose.model("TestUser", UserSchema);
