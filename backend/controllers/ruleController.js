// controllers/ruleController.js

const Rule = require("../models/Rule");
const { createRule, combineRules, evaluateRule } = require("../utils/AST");

const validAttributes = [
  "age",
  "department",
  "income",
  "spend",
  "salary",
  "experience",
];

// controllers/ruleController.js
const updateRuleHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { ruleString } = req.body;

    if (!validateRuleString(ruleString)) {
      return res
        .status(400)
        .json({ message: "Invalid rule syntax, operator, or attribute" });
    }

    const updatedAST = createRule(ruleString);

    const updatedRule = await Rule.findByIdAndUpdate(
      id,
      { ruleString, ast: updatedAST },
      { new: true, runValidators: true }
    );

    if (!updatedRule) {
      return res.status(404).json({ message: "Rule not found" });
    }

    res.status(200).json({
      message: "Rule updated successfully",
      rule: updatedRule,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating rule", error: error.message });
  }
};
const validateRuleString = (ruleString) => {
  console.log(`Validating rule string: "${ruleString}"`);

  const stack = [];
  const tokens = ruleString.split(/\s+/); // Split by whitespace
  const validOperators = ["AND", "OR", ">", "<", ">=", "<=", "=", "!="];
  const validAttributes = [
    "age",
    "department",
    "income",
    "spend",
    "salary",
    "experience",
  ];

  for (let token of tokens) {
    console.log(`Current token: "${token}"`);

    // Check if token is an opening parenthesis
    if (token === "(") {
      stack.push(token);
    }
    // Check if token is a closing parenthesis
    else if (token === ")") {
      if (stack.length === 0) {
        console.error("Validation failed: unmatched closing parenthesis");
        return false; // Unmatched closing parenthesis
      }
      stack.pop();
    }
    // Check if token is a valid operator
    else if (validOperators.includes(token.toUpperCase())) {
      continue;
    }
    // Check if token is a valid attribute
    else if (validAttributes.includes(token.trim())) {
      continue;
    }
    // Check if token is a valid value (either a number or a quoted string)
    else if (!isNaN(token) || /^'.*'$/.test(token)) {
      // isNaN(token) checks if it's a number
      // /^'.*'$/.test(token) checks if it's a string enclosed in single quotes
      continue;
    }
    // If none of the above conditions are met, the token is invalid
    else {
      console.error(`Invalid token: "${token}"`);
      return false;
    }
  }

  // Ensure all parentheses are closed
  if (stack.length !== 0) {
    console.error("Validation failed: unmatched opening parenthesis");
    return false;
  }

  console.log("Validation successful for rule string");
  return true;
};

// Create a rule and store its AST
const createRuleHandler = async (req, res) => {
  try {
    const { name, ruleString } = req.body;

    console.log("Received rule name:", name);
    console.log("Received rule string:", ruleString);

    // Validate the rule string
    if (!validateRuleString(ruleString)) {
      console.error("Validation failed for rule string:", ruleString);
      return res.status(400).json({
        message: "Invalid rule syntax or attribute name",
        details:
          "Ensure correct operators, balanced parentheses, and valid attributes.",
      });
    }

    // Create AST and save the rule
    const ast = createRule(ruleString);
    const newRule = new Rule({ name, ruleString, ast }); // <-- Ensure name is included

    await newRule.save();

    res.status(201).json({
      message: "Rule created successfully",
      rule: newRule, // <-- Make sure the response includes the full rule object
    });
  } catch (error) {
    console.error("Error creating rule:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create rule", error: error.message });
  }
};

// Combine multiple rules into a single AST
const combineRulesHandler = async (req, res) => {
  try {
    const { ruleStrings } = req.body;
    const combinedAST = combineRules(ruleStrings);

    res.status(200).json({
      message: "Rules combined successfully",
      ast: combinedAST,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Evaluate rule's AST against user data
const evaluateRuleHandler = async (req, res) => {
  try {
    const { ruleId, userData } = req.body;

    // Fetch rule from the database
    const rule = await Rule.findById(ruleId);
    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }

    // Evaluate the rule's AST against the user data
    const result = evaluateRule(rule.ast, userData);

    res.status(200).json({
      message: "Rule evaluation completed",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRuleHandler,
  combineRulesHandler,
  evaluateRuleHandler,
  updateRuleHandler,
};
