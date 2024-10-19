// src/components/RuleEvaluation.jsx
import React, { useEffect, useState } from "react";
import { getAllRules, evaluateRule } from "../api";

const RuleEvaluation = () => {
  const [rules, setRules] = useState([]);
  const [selectedRuleId, setSelectedRuleId] = useState("");
  const [userData, setUserData] = useState({
    age: "",
    department: "",
    salary: "",
    experience: "",
  });
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // Fetch all rules when the component mounts
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const fetchedRules = await getAllRules();
        setRules(fetchedRules);
      } catch (error) {
        console.error("Error fetching rules:", error.message);
        setError("Failed to fetch rules. Please try again later.");
      }
    };

    fetchRules();
  }, []);

  // Handle form submission for evaluation
  const handleEvaluate = async (e) => {
    e.preventDefault();

    if (!selectedRuleId) {
      setError("Please select a rule to evaluate.");
      return;
    }

    try {
      const evaluationData = {
        ruleId: selectedRuleId,
        userData: {
          age: parseInt(userData.age),
          department: userData.department,
          salary: parseFloat(userData.salary),
          experience: parseInt(userData.experience),
        },
      };

      // Make an API request to evaluate the rule
      const evaluationResult = await evaluateRule(evaluationData);
      console.log("Evaluation Result:", evaluationResult); // Log the evaluation result for debugging

      // Extract the result value from the response
      if (evaluationResult && evaluationResult.result !== undefined) {
        setResult(evaluationResult.result ? "True" : "False");
      } else {
        setResult("Unable to evaluate rule. Please check your inputs.");
      }
    } catch (error) {
      console.error("Error evaluating rule:", error.message);
      setError("Failed to evaluate the rule. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Evaluate Rule</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleEvaluate}>
        {/* Dropdown to select a rule */}
        <div>
          <label>Select Rule:</label>
          <select
            value={selectedRuleId}
            onChange={(e) => setSelectedRuleId(e.target.value)}
            required
          >
            <option value="">-- Select a rule --</option>
            {rules.map((rule) => (
              <option key={rule._id} value={rule._id}>
                {rule.name ? rule.name : "No name available"}
              </option>
            ))}
          </select>
        </div>

        {/* Inputs for user data */}
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={userData.age}
            onChange={(e) => setUserData({ ...userData, age: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            value={userData.department}
            onChange={(e) =>
              setUserData({ ...userData, department: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            value={userData.salary}
            onChange={(e) =>
              setUserData({ ...userData, salary: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Experience:</label>
          <input
            type="number"
            value={userData.experience}
            onChange={(e) =>
              setUserData({ ...userData, experience: e.target.value })
            }
            required
          />
        </div>

        <button type="submit">Evaluate Rule</button>
      </form>

      {result && (
        <p className="result">
          Evaluation Result: <strong>{result}</strong>
        </p>
      )}
    </div>
  );
};

export default RuleEvaluation;
