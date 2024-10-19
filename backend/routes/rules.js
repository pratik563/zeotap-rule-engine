// routes/rules.js
const express = require("express");
const router = express.Router();
const {
  createRuleHandler,
  updateRuleHandler,
  combineRulesHandler,
  evaluateRuleHandler,
  getAllRulesHandler, // <-- Ensure this is defined
} = require("../controllers/ruleController");

// Define the route to create a rule
router.post("/create", createRuleHandler);

// Define the route to update a rule
router.put("/:id", updateRuleHandler);

// Define the route to combine multiple rules
router.post("/combine", combineRulesHandler);

// Define the route to evaluate a rule
router.post("/evaluate", evaluateRuleHandler);

// Define the route to get all rules
router.get("/", getAllRulesHandler); // <-- This defines the GET route

module.exports = router;
