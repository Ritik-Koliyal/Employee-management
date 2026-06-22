const express = require("express");
const { createEmployee } = require("../controllers/emp.controller");
const router = express.Router();

router.post("/create", createEmployee);

module.exports = router;
