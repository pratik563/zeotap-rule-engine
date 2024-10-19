import axios from "axios";

const API_URL = "http://localhost:5000/api/rules"; // URL of your backend

// Create a new rule
export const createRule = async (ruleData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, ruleData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating rule:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Get all rules
export const getAllRules = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.rules; // Assuming the response structure has a "rules" array
  } catch (error) {
    throw new Error("Failed to fetch rules.");
  }
};

// Combine rules
export const combineRules = async (ruleStrings) => {
  try {
    const response = await axios.post(`${API_URL}/combine`, { ruleStrings });
    return response.data;
  } catch (error) {
    console.error(
      "Error combining rules:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Evaluate a rule
export const evaluateRule = async (evaluationData) => {
  try {
    const response = await axios.post(`${API_URL}/evaluate`, evaluationData);
    return response.data; // Assuming the backend response contains the evaluation result
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message || error.response.data
      : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};
