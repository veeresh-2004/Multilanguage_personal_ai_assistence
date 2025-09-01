// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/loansDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define Loan Schema
const loanSchema = new mongoose.Schema({
  Loan_Type: String,
  Loan_Amount_Applied: Number,
  Loan_Tenure_Applied: Number,
  Monthly_Income: Number,
  Existing_EMI: Number
});

const Loan = mongoose.model("Loan", loanSchema);

// API to get all loans
app.get("/api/loans", async (req, res) => {
  const loans = await Loan.find({});
  res.json(loans);
});

app.listen(5000, () => console.log("Server running on port 5000"));
