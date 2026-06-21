require("dotenv").config();

const express = require("express");
const cors = require("cors");

console.log("AUTH_SERVICE =", process.env.AUTH_SERVICE);

const gatewayRoutes = require("./routes/gatewayRoutes");

const app = express();

app.use(cors());

app.use("/api", gatewayRoutes);

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        service: "API Gateway",
        status: "Running"
    });
});

app.listen(process.env.PORT, () => {
    console.log(
        `API Gateway running on port ${process.env.PORT}`
    );
});