const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
  {
    classId: { type: String },
    idPrice: { type: String },
    value: { type: Number },
    paid: { type: String, enum: ["Yes", "No"] },
    userId: { type: String },
    usedClass: { type: String },
    studentId: { type: String },
    subject: { type: String },
    classCanBook: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
