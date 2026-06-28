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

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
