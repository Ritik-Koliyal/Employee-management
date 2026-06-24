const jwt = require("jsonwebtoken");

const generateAccessToken = async (employee) => {
  return jwt.sign(
    {
      _id: employee._id,
      empID: employee.empID,
      role: employee.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
};

const generateRefreshToken = async (employee) => {
  return jwt.sign(
    {
      _id: employee._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" },
  );
};

const generateEmailVerificationToken = (employee) => {
  return jwt.sign(
    {
      employeeId: employee._id,
    },
    process.env.EMAIL_VERIFY_SECRET,
    {
      expiresIn: "24h",
    },
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateEmailVerificationToken,
};
