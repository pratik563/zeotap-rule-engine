// src/components/RuleList.jsx
import React, { useEffect, useState } from "react";
import { getAllRules } from "../api";

const RuleList = () => {
  const [rules, setRules] = useState([]); // State to hold the fetched rules
  const [error, setError] = useState(""); // State to handle any errors

  // Fetch rules when the component mounts
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const fetchedRules = await getAllRules();
        console.log("Fetched rules:", fetchedRules); // Debug log to verify structure
        if (Array.isArray(fetchedRules)) {
          setRules(fetchedRules);
        } else {
          setError("Unexpected data format.");
        }
      } catch (error) {
        console.error("Error fetching rules:", error.message);
        setError("Failed to fetch rules. Please try again later.");
      }
    };

    fetchRules();
  }, []);

  return (
    <div className="container">
      <h2>Rules List</h2>
      {error && <p className="error">{error}</p>} {/* Display error if any */}
      {rules.length === 0 ? (
        <p>No rules available.</p> // Show this if there are no rules
      ) : (
        <ul>
          {rules.map((rule) => (
            <li key={rule._id}>
              <strong>Name:</strong>{" "}
              {rule.name ? rule.name : "No name available"} <br />
              <strong>Rule:</strong> {rule.ruleString}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RuleList;
