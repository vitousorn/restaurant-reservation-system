const express = require("express");
const Restaurant = require("./restaurantModel");
const { auth, verifyOwner } = require("./authMiddleware");

const router = express.Router();

// Create Restaurant
router.post("/", verifyOwner, async (req, res) => {
  try {
    const restaurant = await Restaurant.create({
      ...req.body,
      ownerId: req.user.id
    });

    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get All Restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants =
      await Restaurant.find();

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get Restaurant By ID
router.get("/:id", async (req, res) => {
  try {
    const restaurant =
      await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get Owner Restaurants
router.get("/owner/my-restaurants", verifyOwner, async (req, res) => {
    try {
      const restaurants =
        await Restaurant.find({
          ownerId: req.user.id
        });

      res.json(restaurants);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

// Update Restaurant
router.put("/:id", verifyOwner, async (req, res) => {
  try {
    const restaurant =
      await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    if (
      restaurant.ownerId !== req.user.id
    ) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    const updated =
      await Restaurant.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Delete Restaurant
router.delete("/:id", verifyOwner, async (req, res) => {
  try {
    const restaurant =
      await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    if (
      restaurant.ownerId !== req.user.id
    ) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    await Restaurant.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Restaurant deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
module.exports = router;