const express = require("express");
const Reservation = require("./reservationModel");
const { auth, verifyCustomer,verifyOwner } = require("./authMiddleware");

const router = express.Router();


// Create Reservation
router.post("/", verifyCustomer, async (req, res) => {
  try {
    const reservation =
      await Reservation.create({
        ...req.body,
        customerId: req.user.id
      });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});



// Get My Reservations
router.get("/my-reservations", verifyCustomer, async (req, res) => {
  try {
    const reservations =
      await Reservation.find({
        customerId: req.user.id
      });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get Reservation By ID
router.get("/:id", auth, async (req, res) => {
  try {
    const reservation =
      await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found"
      });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});



// Cancel Reservation
router.put("/:id/cancel", verifyCustomer, async (req, res) => {
  try {
    const reservation =
      await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found"
      });
    }

    if (
      reservation.customerId !== req.user.id
    ) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    reservation.status = "cancelled";

    await reservation.save();

    res.json(reservation);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Confirm Reservation (Owner/Admin)
router.put("/:id/confirm", verifyOwner, async (req, res) => {
  try {
    const reservation =
      await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found"
      });
    }

    reservation.status = "confirmed";

    await reservation.save();

    res.json(reservation);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
