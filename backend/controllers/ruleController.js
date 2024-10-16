// controllers/ruleController.js
const Rule = require("../models/Rule");
const { Node, createNode } = require("../utils/AST");

exports.createRule = async (req, res) => {
  try {
    const { ruleString } = req.body;

    // Parse ruleString to create AST (simplified for this example)
    const rootNode = createNode("operator", "AND"); // Placeholder for root node

    // Create and save rule
    const rule = new Rule({
      name: "Sample Rule", // replace as needed
      ast: rootNode,
    });

    await rule.save();
    res.status(201).json({ message: "Rule created successfully", rule });
  } catch (error) {
    res.status(500).json({ message: "Error creating rule", error });
  }
};

exports.combineRules = async (req, res) => {
  try {
    const { ruleStrings } = req.body;

    // Create combined AST (simplified example)
    const combinedRoot = createNode("operator", "AND"); // Root operator node
    ruleStrings.forEach((ruleString) => {
      const ruleNode = createNode("operand", ruleString); // Placeholder for operand node
      combinedRoot.left = ruleNode; // Add to left child for simplicity
    });

    res
      .status(200)
      .json({
        message: "Rules combined successfully",
        combinedAST: combinedRoot,
      });
  } catch (error) {
    res.status(500).json({ message: "Error combining rules", error });
  }
};

exports.evaluateRule = async (req, res) => {
  try {
    const { data, ruleAST } = req.body;

    // Evaluate AST against user data (simplified logic)
    const result = evaluateAST(ruleAST, data); // Placeholder function

    res.status(200).json({ message: "Evaluation complete", result });
  } catch (error) {
    res.status(500).json({ message: "Error evaluating rule", error });
  }
};

// Placeholder evaluateAST function in same file
function evaluateAST(node, data) {
  // Add logic to evaluate node based on data (mocked here as always true)
  return true;
}
