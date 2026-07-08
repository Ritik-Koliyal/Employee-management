const Employee = require("../models/employee.model.js");
const bcrypt = require("bcryptjs");
const generateEmployeeID = require("../utills/generateEmployeeID.js");
const {
  generateAccessToken,
  verifyRefreshToken,
} = require("../utills/JWT/token.js");
const { generateRefreshToken } = require("../utills/JWT/token.js");
const { OAuth2Client } = require("google-auth-library");
const { loginUser } = require("../services/auth.service.js");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
      aadharNumber,
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
      aadharNumber,
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

    const data = await loginUser(employee, res);

    return res.status(200).json({
      success: true,
      message: "Login Successfull..",
      data,
    });
  } catch (error) {
    console.error("error while login", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    console.log("tickets", ticket);

    const payload = ticket.getPayload();
    console.log("payload from the google", payload);

    const employee = await Employee.findOne({
      email: payload.email,
      isDeleted: false,
    }).select("+refreshToken");

    console.log("employee", employee);

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Employee is not registered.",
      });
    }

    if (!employee.googleId) {
      employee.googleId = payload.sub;
      employee.profilePicture = payload.picture;
      employee.emailVerified = payload.email_verified;

      if (!employee.authProvider.includes("google")) {
        employee.authProvider.push("google");
      }
      await employee.save();
    }
    if (employee.googleId !== payload.sub) {
      return res.status(401).json({
        success: false,
        message: "Google account mismatch.",
      });
    }
    const data = await loginUser(employee, res);

    return res.status(200).json({
      success: true,
      message: "Login Successfull..",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("refresh token console", refreshToken);

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const employee = await Employee.findById(decoded._id).select(
      "+refreshToken",
    );

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (employee.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const accessToken = await generateAccessToken(employee);

    return res.status(200).json({
      success: true,
      message: "Access token generated",
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
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
};

const getProfile = async (req, res) => {
  const employee = await Employee.findById(req.user._id).select(
    "-password -refreshToken",
  );

  return res.json({
    success: true,
    employee,
  });
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

module.exports = {
  createEmployee,
  login,
  googleLogin,
  refreshAccessToken,
  getProfile,
  logout,
};
