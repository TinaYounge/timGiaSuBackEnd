const mongoose = require("mongoose");
const TimeInADaySchema = new mongoose.Schema(
  {
    h7p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h7p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h8p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h8p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h9p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h9p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h10p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h10p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h11p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h11p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h12p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h12p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h13p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h13p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h14p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h14p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h15p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h15p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h16p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h16p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h17p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h17p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h18p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h18p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h19p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h19p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h20p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h20p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h21p00: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    h21p30: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("TimeInADay", TimeInADaySchema);
