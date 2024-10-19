import "./App.css";
import React from "react";
import RuleForm from "./components/RuleForm";
import RuleList from "./components/RuleList";
import RuleEvaluation from "./components/RuleEvaluation";

const App = () => {
  return (
    <div className="container">
      <h1>Rule Management System</h1>
      <RuleForm />
      <RuleList />
      <RuleEvaluation />
    </div>
  );
};

export default App;
