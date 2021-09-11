const mongoose = require("mongoose");
const ScheduleSchema = new mongoose.Schema(
  {
    dayInWeek: {
      type: String,
      enum: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
      default: "Thứ 2",
    },
    time: [{ type: mongoose.Schema.Types.ObjectId, ref: "TimeInADaySchema" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Schedule", ScheduleSchema);
