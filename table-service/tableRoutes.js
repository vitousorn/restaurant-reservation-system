const express = require("express");
const Table = require("./tableModel");
const {auth, verifyOwner} = require("./authMiddleware");

const router = express.Router();

// Create Table
router.post("/", verifyOwner, async (req, res) => {
  try {
    const table = await Table.create(req.body);

    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Get Tables By Restaurant
router.get("/restaurant/:restaurantId", async (req, res) => {
  try {
    const tables = await Table.find({
      restaurantId: req.params.restaurantId
    });

    res.json(tables);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Get Single Table
router.get("/:id", async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({
        message: "Table not found"
      });
    }

    res.json(table);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Update Table
router.put("/:id/update", verifyOwner, async (req, res) => {
  try {
    const table = await Table.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        status: "reserved"
      },
      { new: true }
    );

    res.json(table);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Delete Table
router.delete("/:id", verifyOwner, async (req, res) => {
  try {
    await Table.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Table deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
module.exports = router;