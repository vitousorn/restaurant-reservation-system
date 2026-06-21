require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const reservationRoutes =
  require("./reservationRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(
  "/api/reservations",
  reservationRoutes
);

app.get("/", (req, res) => {
  res.json({
    service: "Reservation Service",
    status: "Running"
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Reservation Service running on port ${process.env.PORT}`
  );
});