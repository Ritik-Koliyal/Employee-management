const mongoose = require("mongoose");

const DesignationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: false,
    },
  },
  { timeStamps: true },
);

module.exports = mongoose.model("Designation", DesignationSchema);
