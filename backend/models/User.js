// models/User.js
const mongoose = require("mongoose");

// User schema to store user attributes for eligibility checks
const UserSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  experience: { type: Number, required: true },
});

module.exports = mongoose.model("User", UserSchema);
