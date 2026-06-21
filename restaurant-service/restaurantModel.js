const mongoose = require("mongoose");

// Restaurant Model
// {
//     "name": "The Golden Plate",
//     "address": "123 Main St",
//     "phone": "123456",
//     "cuisine": "Italian"
// }

const restaurantSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    cuisine: {
      type: String
    },

    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Restaurant",
  restaurantSchema
);