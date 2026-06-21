const express = require("express");

const router = express.Router();

const {
    register,
    login,
    verify
} = require("./authController");

const verifyToken =
    require("./authMiddleware");

router.post(
    "/register",
    register
);

router.post(
    "/login",
    login
);

router.get(
    "/verify",
    verifyToken,
    verify
);

module.exports = router;