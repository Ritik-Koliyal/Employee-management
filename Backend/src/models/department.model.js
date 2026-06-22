const mongoose = require("mongoose");
const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: false,
    },
  },
  { timeStamps: true },
);

module.exports = mongoose.model("Department", DepartmentSchema);
