const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    marks: { type: Map, of: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", ResultSchema);
