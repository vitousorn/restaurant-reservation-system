require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const tableRoutes = require("./tableRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/tables", tableRoutes);

app.get("/", (req, res) => {
  res.json({
    service: "Table Service",
    status: "Running"
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Table Service running on port ${process.env.PORT}`
  );
});