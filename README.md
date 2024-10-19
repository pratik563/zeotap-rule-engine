# Rule Engine Application

## Project Overview

This project is a **Rule Engine Application** designed as a dynamic 3-tier architecture that allows the creation, combination, modification, and evaluation of user eligibility rules. These rules are based on attributes such as age, department, income, salary, and experience. The project consists of a **frontend**, **backend**, and **database**, making it a comprehensive full-stack application.

The Rule Engine represents each rule as an **Abstract Syntax Tree (AST)**, allowing for efficient parsing and evaluation of complex, nested rules. The frontend is built using **React**, while the backend is developed with **Node.js** and **Express.js**, and the data is stored in **MongoDB**.

## Features

### Core Features

- **Create Individual Rules**: Users can create rules using logical expressions (e.g., `age > 30 AND department = 'Sales'`).
- **Combine Multiple Rules**: Multiple rules can be combined into one logical AST.
- **Evaluate Rules**: The created or combined rules can be evaluated against user data to determine eligibility.
- **REST API**: Backend APIs to create, modify, delete, and evaluate rules.

### Bonus Features Implemented

- **Error Handling**: Handles invalid rule strings, missing data, and other potential errors.
- **Soft Deletion**: Rules can be marked as deleted without removing them from the database, and can also be restored.
- **Attribute Validation**: Ensures that only valid attributes are used in rule definitions.

## Technologies and Dependencies

- **Frontend**: React, Axios
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB Atlas
- **Others**: Docker (optional, for containerization)

### Dependencies

- **Node.js** (v14+)
- **MongoDB Atlas** account (or local MongoDB installation)
- **npm** for managing packages
- **Docker** (optional, for containerization)

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** and **npm**
- **MongoDB** (or access to MongoDB Atlas)
- **Git**
- (Optional) **Docker** for containerization

### Steps to Run the Project

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/rule-engine-app.git
   cd rule-engine-app
   ```

2. **Backend Setup**:

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory and add the MongoDB connection string:

   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/rule-engine?retryWrites=true&w=majority
   ```

   Start the server:

   ```bash
   node server.js
   ```

3. **Frontend Setup**:
   Open a new terminal and run the following commands:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   The frontend should now be running on `http://localhost:5173`.

4. **(Optional) Docker Setup**:
   - To run the backend in a Docker container, use the provided `Dockerfile`.
   ```bash
   docker build -t rule-engine-backend .
   docker run -p 5000:5000 rule-engine-backend
   ```

## API Overview

- **POST /api/rules/create**: Create a new rule.
- **POST /api/rules/combine**: Combine multiple rules.
- **POST /api/rules/evaluate**: Evaluate a rule with given user data.
- **GET /api/rules**: Get all rules (excluding soft-deleted ones).
- **PUT /api/rules/:id**: Update an existing rule.
- **DELETE /api/rules/soft-delete/:id**: Soft delete a rule.
- **PATCH /api/rules/restore/:id**: Restore a soft-deleted rule.

## Usage Guide

### Creating a Rule

- Open the app in your browser (`http://localhost:5173`).
- Navigate to the **Create Rule** section.
- Enter a rule name and a logical expression (e.g., `age > 30 AND department = 'Sales'`).
- Click **Create Rule**.

### Viewing Rules

- Scroll down to see all existing rules listed under **Rules List**.

### Evaluating a Rule

- Go to the **Evaluate Rule** section.
- Select a rule from the dropdown.
- Provide the relevant user data (e.g., `age`, `department`, etc.).
- Click **Evaluate Rule** to get the result (`True` or `False`).

## Design Decisions

- **Abstract Syntax Tree (AST)**: The AST was chosen for flexibility in representing rules and evaluating complex logic.
- **MongoDB**: A NoSQL database like MongoDB is ideal for the flexibility of storing nested rule structures.
- **React and Node.js**: A modern stack that allows for quick development of full-stack web applications.

## Testing Instructions

### Manual Testing

- **Create Rules**: Test the rule creation with various attributes and conditions.
- **Combine Rules**: Combine different rules to verify the AST is correctly structured.
- **Evaluate Rules**: Provide sample user data to evaluate whether the rule conditions are met.
- **Error Handling**: Test with invalid rules or missing fields to ensure proper error responses.

### Testing with Postman

- You can use Postman to directly call the APIs.
- Import the following example JSON body to test rule creation:
  ```json
  {
    "name": "Sales Department Age Rule",
    "ruleString": "age > 30 AND department = 'Sales'"
  }
  ```

## FAQ and Troubleshooting

- **CORS Error**: If you encounter CORS issues, ensure the backend is allowing requests from the frontend origin (`http://localhost:5173`).
- **MongoDB Connection Issues**: Double-check the `.env` file for the correct MongoDB URI.
- **Frontend Not Connecting to Backend**: Make sure the backend server (`http://localhost:5000`) is running before you start the frontend.

## Conclusion

This **Rule Engine Application** demonstrates the creation, combination, and evaluation of complex logical conditions through a well-structured frontend and backend. The project showcases various aspects of full-stack development, including **API creation**, **frontend-backend integration**, and **error handling**. Feel free to explore, contribute, or reach out for any questions.
