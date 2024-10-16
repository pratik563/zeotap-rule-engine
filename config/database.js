// database.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("<Your MongoDB connection string>", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1); // Stop the app if the connection fails
  }
};

module.exports = connectDB;
