const express = require("express");
const {
  createEmployee,
  login,
  verifyEmail,
} = require("../controllers/emp.controller");
const auth = require("../middleware/auth.middleware.js");
const router = express.Router();

router.post("/create", auth, createEmployee);
router.post("/login", login);
router.get("/verify-email/:token", verifyEmail);

module.exports = router;
