const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  authId: {
    type: String,
    required: true,
    unique: true
  },
  username: String,
  email: String,
  role: {
    type: String,
    enum: ["customer", "restaurant_owner"],
    default: "customer"
  },
  phone: String
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);