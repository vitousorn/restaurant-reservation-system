const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

/*
=========================================
AUTH SERVICE
No token required
=========================================
*/

router.use(
    "/auth",
    createProxyMiddleware({
        target: process.env.AUTH_SERVICE,
        changeOrigin: true,
        pathRewrite: (path, req) => {
            return "/api/auth" + path;
        }
    })
);

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