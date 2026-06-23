const express = require("express");
const { createEmployee, login } = require("../controllers/emp.controller");
const auth = require("../middleware/auth.middleware.js");
const router = express.Router();

router.post("/create", auth, createEmployee);
router.post("/login", login);

module.exports = router;
