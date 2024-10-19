// src/components/RuleForm.jsx
import React, { useState } from "react";
import { createRule } from "../api.js";

const RuleForm = () => {
  const [ruleName, setRuleName] = useState("");
  const [ruleString, setRuleString] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ruleData = {
      name: ruleName,
      ruleString: ruleString,
    };

    try {
      const result = await createRule(ruleData);
      console.log("API Response:", result);

      if (result.rule && result.rule.name) {
        setMessage(`Rule created successfully: ${result.rule.name}`);
      } else {
        setMessage("Rule created successfully, but name is missing.");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response
        ? error.response.data.message || error.response.data
        : "An unexpected error occurred";

      setMessage(errorMessage);
    }
  };

  return (
    <div className="container">
      <h2>Create Rule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rule Name:</label>
          <input
            type="text"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rule String:</label>
          <input
            type="text"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Rule</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RuleForm;
