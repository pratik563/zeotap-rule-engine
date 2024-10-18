// models/Rule.js
// models/Rule.js
const mongoose = require("mongoose");

// Define the structure of an AST node
const NodeSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "operator" or "operand"
  left: { type: mongoose.Schema.Types.Mixed, default: null }, // reference to left child node
  right: { type: mongoose.Schema.Types.Mixed, default: null }, // reference to right child node
  value: { type: mongoose.Schema.Types.Mixed, default: null }, // value for operand nodes
});

// Rule schema to store AST and metadata
const RuleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // <-- Ensure the name field is defined here
  ruleString: { type: String, required: true },
  ast: { type: NodeSchema, required: true }, // AST root node
  createdAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Rule", RuleSchema);
