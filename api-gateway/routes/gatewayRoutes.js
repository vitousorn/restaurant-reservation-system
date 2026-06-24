const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const axios = require("axios");

const verifyToken = require("../middleware/authMiddleware");
const { getTarget } = require("../loadBalancer");

const router = express.Router();

/*
=========================================
AUTH SERVICE
Load balanced — no token required
=========================================
*/

router.use("/auth", async (req, res) => {
  try {
    const target = getTarget("auth");
    const url = `${target}/api/auth${req.path}`;
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: { authorization: req.headers.authorization },
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    res.status(status).json(err.response?.data || { message: "Gateway error" });
  }
});

/*
=========================================
USER SERVICE
=========================================
*/

router.use(
    "/users",
    verifyToken,
    createProxyMiddleware({
        target: process.env.USER_SERVICE,
        changeOrigin: true,
        pathRewrite: (path, req) => {
            return "/api/users" + path;
        }
    })
);


/*
=========================================
RESTAURANT SERVICE
=========================================
*/

router.use(
    "/restaurants",
    verifyToken,
    createProxyMiddleware({
        target: process.env.RESTAURANT_SERVICE,
        changeOrigin: true,
        pathRewrite: (path, req) => {
            return "/api/restaurants" + path;
        }
    })
);

/*
=========================================
TABLE SERVICE
=========================================
*/

router.use(
    "/tables",
    verifyToken,
    createProxyMiddleware({
        target: process.env.TABLE_SERVICE,
        changeOrigin: true,
        pathRewrite: (path, req) => {
            return "/api/tables" + path;
        }
    })
);

/*
=========================================
RESERVATION SERVICE
=========================================
*/

router.use(
    "/reservations",
    verifyToken,
    createProxyMiddleware({
        target: process.env.RESERVATION_SERVICE,
        changeOrigin: true,
        pathRewrite: (path, req) => {
            return "/api/reservations" + path;
        }
    })
);

module.exports = router;