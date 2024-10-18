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
    return response.data.rules;
  } catch (error) {
    console.error(
      "Error fetching rules:",
      error.response ? error.response.data : error.message
    );
    throw error;
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
export const evaluateRule = async (ruleId, userData) => {
  try {
    const response = await axios.post(`${API_URL}/evaluate`, {
      ruleId,
      userData,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error evaluating rule:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
