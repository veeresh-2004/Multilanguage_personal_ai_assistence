import React, { useState } from "react";
import loansData from "../../data/train_loans.json"; // adjust path if needed

function LoansTable() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter loans based on search term
  const filteredLoans = loansData.filter((loan) => {
    return (
      loan.Loan_Amount_Applied.toString().includes(searchTerm) ||
      loan.Loan_Tenure_Applied.toString().includes(searchTerm) ||
      loan.Monthly_Income.toString().includes(searchTerm)
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bank Loans List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Loan Amount, Tenure or Monthly Income"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "500px",
          fontSize: "16px",
        }}
      />

      {/* Loans Table */}
      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th>Loan Amount</th>
            <th>Tenure (Months)</th>
            <th>Monthly Income</th>
            <th>Existing EMI</th>
          </tr>
        </thead>
        <tbody>
          {filteredLoans.map((loan, index) => (
            <tr key={index}>
              <td>{loan.Loan_Amount_Applied}</td>
              <td>{loan.Loan_Tenure_Applied}</td>
              <td>{loan.Monthly_Income}</td>
              <td>{loan.Existing_EMI}</td>
            </tr>
          ))}
          {filteredLoans.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LoansTable;
