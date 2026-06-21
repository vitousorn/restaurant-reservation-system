require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const restaurantRoutes =
  require("./restaurantRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(
  "/api/restaurants",
  restaurantRoutes
);

app.get("/", (req, res) => {
  res.json({
    service: "Restaurant Service",
    status: "Running"
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Restaurant Service running on port ${process.env.PORT}`
  );
});