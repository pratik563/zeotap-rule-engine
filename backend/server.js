// server.js
const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const app = express();

// Load environment variables from .env file
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Set up middleware to parse JSON requests
app.use(express.json());

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

// Define a basic route for the root URL to respond to GET requests
app.get("/", (req, res) => {
  res.send("Welcome to the Expense Tracker API"); // Adjust this message as needed
});

// Set up other routes
app.use("/api/rules", require("./routes/rules")); // <-- Ensure this points to the correct routes file

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});
