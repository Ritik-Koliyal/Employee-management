const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    empID: {
      type: String,
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    fatherName: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
    },

    alterNatePhoneNumber: {
      type: Number,
    },

    address: {
      country: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      district: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      pinCode: {
        type: Number,
        required: true,
      },
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
      required: true,
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Employee", EmployeeSchema);
