const Employee = require("../models/employee.model.js");
const bcrypt = require("bcryptjs");
const generateEmployeeID = require("../utills/generateEmployeeID.js");

const generatePassword = (firstName, dob) => {
  const date = new Date(dob);
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${firstName.toLowerCase()}${day}${year}`;
};

const createEmployee = async (req, res) => {
  console.log("req body", req.body);
  try {
    const {
      firstName,
      lastName,
      email,
      fatherName,
      dob,
      phoneNumber,
      alterNatePhoneNumber,
      address,
      department,
      designation,
      role,
    } = req.body;

    // Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !fatherName ||
      !dob ||
      !phoneNumber ||
      !address ||
      !department ||
      !designation ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check email already exists
    const existingEmployee = await Employee.findOne({
      email,
      isDeleted: false,
    });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists with this email",
      });
    }

    // Generate Employee ID
    const empID = await generateEmployeeID();

    // Generate Default Password
    const plainPassword = generatePassword(firstName, dob);

    // Hash Password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Create Employee
    const employee = await Employee.create({
      empID,
      firstName,
      lastName,
      email,
      fatherName,
      dob,
      phoneNumber,
      alterNatePhoneNumber,
      address,
      department,
      designation,
      role,
      password: hashedPassword,
      createdBy: req.user?._id || null,
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",

      data: {
        employee,
        defaultPassword: plainPassword,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createEmployee,
};
