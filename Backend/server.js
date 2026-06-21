const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const pool = require("./src/db/db.js");
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});

app.listen(2100, () => {
  console.log("server start ");
});
