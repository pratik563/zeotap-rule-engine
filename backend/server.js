// server.js
// server.js
const express = require("express");
const connectDB = require("./config/database");
const app = express();

// Load environment variables from .env file
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Set up middleware, routes, etc.
app.use(express.json());
app.use("/api/rules", require("./routes/rules"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
