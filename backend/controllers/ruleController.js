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
  const stack = [];
  const tokens = ruleString.split(/\s+/);
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
    if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      if (stack.length === 0) return false; // Unmatched closing parenthesis
      stack.pop();
    } else if (validOperators.includes(token.toUpperCase())) {
      continue;
    } else {
      const [attribute, operator] = token.split(/(>|<|=|!)/).filter(Boolean);
      if (!validAttributes.includes(attribute.trim())) {
        console.log(`Invalid attribute: ${attribute}`); // Debugging
        return false; // Invalid attribute name
      }
    }
  }

  return stack.length === 0; // Return true if parentheses are balanced
};

// Create a rule and store its AST
// controllers/ruleController.js

const createRuleHandler = async (req, res) => {
  try {
    const { ruleString } = req.body;

    // Check if ruleString is provided
    if (!ruleString) {
      return res.status(400).json({ message: "Rule string is required" });
    }

    // Validate the rule string
    if (!validateRuleString(ruleString)) {
      return res.status(400).json({
        message: "Invalid rule syntax or attribute name",
        details:
          "Ensure correct operators, balanced parentheses, and valid attributes.",
      });
    }

    const ast = createRule(ruleString);

    const newRule = new Rule({ ruleString, ast });
    await newRule.save();

    res.status(201).json({
      message: "Rule created successfully",
      rule: newRule,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the rule",
      error: error.message,
    });
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
