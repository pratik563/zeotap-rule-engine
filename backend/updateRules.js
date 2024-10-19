// updateRulesAgain.js
const mongoose = require("mongoose");
const Rule = require("./models/Rule");
require("dotenv").config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Update rules that have the default values
const updateLegacyRules = async () => {
  try {
    await connectDB();

    // Find rules with default values that need better information
    const rulesWithDefaults = await Rule.find({
      ruleString: "Default Rule String",
    });

    for (let rule of rulesWithDefaults) {
      rule.name = "Default Rule Name"; // Update with a more meaningful name
      rule.ruleString = "age > 25 AND department = 'Marketing'"; // Provide a meaningful rule string
      await rule.save();
    }

    console.log("Updated legacy rules with better information.");
    process.exit();
  } catch (error) {
    console.error("Error updating legacy rules:", error);
    process.exit(1);
  }
};

updateLegacyRules();
