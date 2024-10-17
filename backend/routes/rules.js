// routes/rules.js
// routes/rules.js
const express = require("express");
const router = express.Router();
const {
  createRuleHandler,
  updateRuleHandler,
  combineRulesHandler,
  evaluateRuleHandler,
} = require("../controllers/ruleController");

router.post("/create", createRuleHandler);
router.put("/:id", updateRuleHandler);
router.post("/combine", combineRulesHandler);
router.post("/evaluate", evaluateRuleHandler);

module.exports = router;
