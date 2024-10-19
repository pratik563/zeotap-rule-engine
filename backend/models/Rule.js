// models/Rule.js
const mongoose = require("mongoose");

// Define the structure of an AST node
const NodeSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "operator" or "operand"
  left: { type: mongoose.Schema.Types.Mixed, default: null },
  right: { type: mongoose.Schema.Types.Mixed, default: null },
  value: { type: mongoose.Schema.Types.Mixed, default: null },
});

// Rule schema to store AST, name, rule string, and metadata
const RuleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Add this field to store the name of the rule
  ruleString: { type: String, required: true }, // Add this field to store the rule string
  ast: { type: NodeSchema, required: true },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Rule", RuleSchema);
