const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    iaActive: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    marks: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
