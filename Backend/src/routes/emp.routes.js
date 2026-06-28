const express = require("express");
const {
  createEmployee,
  login,
  googleLogin,
  refreshAccessToken,
  getProfile,
  logout,
} = require("../controllers/emp.controller");
const auth = require("../middleware/auth.middleware.js");
const router = express.Router();

router.post("/create", auth, createEmployee);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/refresh-token", refreshAccessToken);
router.get("/me", auth, getProfile);
router.post("/logout", auth, logout);

module.exports = router;
