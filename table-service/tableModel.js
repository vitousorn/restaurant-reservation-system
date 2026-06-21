const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: String,
      required: true
    },

    tableNumber: {
      type: Number,
      required: true
    },

    capacity: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["available", "reserved"],
      default: "available"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Table",
  tableSchema
);