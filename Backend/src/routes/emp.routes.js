const express = require("express");
const {
  createEmployee,
  login,
  verifyEmail,
  sendOtp,
  verifyOtp,
} = require("../controllers/emp.controller");
const auth = require("../middleware/auth.middleware.js");
const router = express.Router();

router.post("/create", auth, createEmployee);
router.post("/login", login);
router.post("/send_otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
