const express = require("express");
const User = require("./userModel");
const verifyToken = require("./authMiddleware");

const router = express.Router();

// Create Profile
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get Logged In User Profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({
      authId: req.user.id
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Update Profile
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { authId: req.user.id },
      req.body,
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;