require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB =
    require("./db");

const authRoutes =
    require("./authRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(
    "/api/auth",
    authRoutes
);

app.get("/", (req, res) => {

    res.json({
        service: "Auth Service"
    });
});

app.listen(
    process.env.PORT,
    () => {
        console.log(
            `Auth Service running on ${process.env.PORT}`
        );
    }
);