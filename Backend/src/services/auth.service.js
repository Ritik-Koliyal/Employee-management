const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utills/JWT/token");

const loginUser = async (employee, res) => {
  const accessToken = await generateAccessToken(employee);
  const refreshToken = await generateRefreshToken(employee);

  employee.refreshToken = refreshToken;
  employee.lastLogin = new Date();

  await employee.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return {
    employee: {
      _id: employee._id,
      empID: employee.empID,
      firstName: employee.firstName,
      role: employee.role,
    },
    accessToken,
  };
};

module.exports = { loginUser };
