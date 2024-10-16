// utils/AST.js
// utils/AST.js

class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type; // "operator" or "operand"
    this.left = left; // Left child for operators
    this.right = right; // Right child for operators
    this.value = value; // Value for operand nodes
  }
}

// Parse a rule string into an AST (Example: "age > 30 AND department = 'Sales'")
function createRule(ruleString) {
  // This is a simplified parser. In a full solution, you’d likely use regex or a parser library
  // for more complex rules. Here, let's assume basic AND/OR rules for simplicity.
  if (ruleString.includes("AND")) {
    const [left, right] = ruleString.split(" AND ");
    return new Node(
      "operator",
      createRule(left.trim()),
      createRule(right.trim()),
      "AND"
    );
  } else if (ruleString.includes("OR")) {
    const [left, right] = ruleString.split(" OR ");
    return new Node(
      "operator",
      createRule(left.trim()),
      createRule(right.trim()),
      "OR"
    );
  } else {
    // Leaf node, representing an actual condition
    return new Node("operand", null, null, ruleString.trim());
  }
}

// Combines multiple ASTs by connecting them under a single root operator (e.g., AND/OR)
function combineRules(rules, operator = "AND") {
  let combinedAST = null;
  rules.forEach((rule) => {
    const ruleAST = createRule(rule);
    combinedAST = combinedAST
      ? new Node("operator", combinedAST, ruleAST, operator)
      : ruleAST;
  });
  return combinedAST;
}

// Evaluates an AST against user data
function evaluateRule(ast, data) {
  if (ast.type === "operator") {
    if (ast.value === "AND") {
      return evaluateRule(ast.left, data) && evaluateRule(ast.right, data);
    } else if (ast.value === "OR") {
      return evaluateRule(ast.left, data) || evaluateRule(ast.right, data);
    }
  } else if (ast.type === "operand") {
    // Split condition, e.g., "age > 30"
    const [attribute, operator, value] = ast.value.split(" ");
    const userValue = data[attribute];
    switch (operator) {
      case ">":
        return userValue > parseInt(value);
      case "<":
        return userValue < parseInt(value);
      case "=":
        return userValue === value.replace(/'/g, ""); // remove quotes for strings
      default:
        return false;
    }
  }
}

// Export the functions
module.exports = { Node, createRule, combineRules, evaluateRule };
