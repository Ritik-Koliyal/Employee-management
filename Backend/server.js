const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const seed = require("./src/Seeder/seed.js");
const PORT = process.env.PORT;
const MONGO_URL = process.env.DATABASE_URL;
const EmpRoutes = require("./src/routes/emp.routes.js");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/emp", EmpRoutes);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log("error while connecting db", e);
  });

app.listen(PORT, () => {
  console.log("Server running...");
});
