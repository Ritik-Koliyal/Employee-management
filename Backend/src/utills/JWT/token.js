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

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
