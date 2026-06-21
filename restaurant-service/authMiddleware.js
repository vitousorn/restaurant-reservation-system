const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "No token"
    });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token"
    });
  }
};

const verifyOwner = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== "restaurant_owner") {
      return res.status(403).json({
        message: "Access denied: Restaurant Owner only"
      });
    }
    next();
  });
};

module.exports = { auth, verifyOwner };