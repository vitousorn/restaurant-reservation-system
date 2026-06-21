require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const userRoutes = require("./userRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    service: "User Service",
    status: "Running"
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `User Service running on port ${process.env.PORT}`
  );
});