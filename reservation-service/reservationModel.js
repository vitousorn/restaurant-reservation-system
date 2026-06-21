const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true
    },

    restaurantId: {
      type: String,
      required: true
    },

    tableId: {
      type: String,
      required: true
    },

    reservationDate: {
      type: Date,
      required: true
    },

    guests: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "cancelled"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Reservation",
  reservationSchema
);