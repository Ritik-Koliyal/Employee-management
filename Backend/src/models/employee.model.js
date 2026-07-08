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

    emailVerified: {
      type: Boolean,
      default: false,
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
      select: false,
    },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },

    lastLogin: {
      type: Date,
      default: null,
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

    googleId: {
      type: String,
      default: null,
    },

    profilePicture: {
      type: String,
      default: null,
    },

    authProvider: {
      type: [String],
      enum: ["password", "google"],
      default: ["password"],
    },

    aadharNumber: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Employee", EmployeeSchema);
