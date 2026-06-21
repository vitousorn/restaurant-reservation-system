const mongoose = require("mongoose");

// RestaurantOwner:
// {
//     "username":"Jake Markson",
//     "email":"jake@gmail.com",
//     "password":"123456",
//     "role":"restaurant_owner"
// }


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
        type: String,
        enum: ["customer", "restaurant_owner"],
        default: "customer"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);