const Employee = require("../models/employee.model.js");
const bcrypt = require("bcryptjs");
const generateEmployeeID = require("../utills/generateEmployeeID.js");
const { generateAccessToken } = require("../utills/JWT/token.js");
const { generateRefreshToken } = require("../utills/JWT/token.js");
const { generateEmailVerificationToken } = require("../utills/JWT/token.js");
const { sendEmail } = require("../services/email.service.js");
const { verificationTemplate } = require("../utills/email/emailTemplates.js");
const generatePassword = (firstName, dob) => {
  const date = new Date(dob);
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${firstName.toLowerCase()}${day}${year}`;
};

const createEmployee = async (req, res) => {
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

    const verificationToken = generateEmailVerificationToken(employee);

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    const html = verificationTemplate(employee.firstName, verificationUrl);

    await sendEmail(employee.email, "Verify Your Email", html);

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

// verify email is valid or not
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.EMAIL_VERIFY_SECRET);

    const employee = await Employee.findById(decoded.employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    employee.emailVerified = true;

    await employee.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired verification link",
    });
  }
};

const login = async (req, res) => {
  try {
    const { empID, password } = req.body;
    if (!empID || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required Fields",
      });
    }

    const employee = await Employee.findOne({
      empID,
      isDeleted: false,
    }).select("password + refreshToken");

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = await generateAccessToken(employee);
    const refreshToken = await generateRefreshToken(employee);

    employee.refreshToken = refreshToken;
    employee.lastLogin = new Date();
    await employee.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        employee: {
          _id: employee._id,
          empID: employee.empID,
          firstName: employee.firstName,
          role: employee.role,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.error("error while login", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createEmployee,
  login,
  verifyEmail,
};
