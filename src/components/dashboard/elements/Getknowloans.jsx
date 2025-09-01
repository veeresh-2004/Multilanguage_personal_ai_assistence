import React, { useState } from "react";
import { IndianRupee, ChevronDown, ChevronUp, CreditCard, Home, Car, GraduationCap, Building, DollarSign } from "lucide-react";

// Sample loan data with advanced details
const loanData = [
  {
    type: "Personal Loan",
    icon: <CreditCard className="w-6 h-6" />,
    description: "A Personal loan is a type of unsecured loan that you can borrow from a bank or financial institution for personal financial needs.",
    interestRate: "9.89% p.a. onwards",
    loanAmount: "Up to ₹1 crore",
    tenure: "Up to 7 years",
    processingFee: "0% - 6% of the loan amount + GST",
    pros: [
      "No collateral required",
      "Flexible repayment tenure",
      "Quick approval process",
    ],
    cons: ["Higher interest rates than secured loans", "Limited loan amount"],
    sampleEMI: { amount: 500000, rate: 12, months: 36 },
    gradient: "from-blue-400 to-blue-600",
  },
  {
    type: "Home Loan",
    icon: <Home className="w-6 h-6" />,
    description: "Home loans help you finance the purchase, construction, or renovation of a residential property.",
    interestRate: "8.5% p.a. onwards",
    loanAmount: "Up to ₹5 crore",
    tenure: "Up to 30 years",
    processingFee: "0.25% - 1% of the loan amount + GST",
    pros: ["Lower interest rates", "High loan amount", "Tax benefits under Section 80C"],
    cons: ["Property required as collateral", "Long repayment tenure"],
    sampleEMI: { amount: 3000000, rate: 8.5, months: 240 },
    gradient: "from-sky-400 to-sky-600",
  },
  {
    type: "Auto Loan",
    icon: <Car className="w-6 h-6" />,
    description: "Auto loans help you purchase a new or used vehicle with flexible repayment options.",
    interestRate: "7.5% p.a. onwards",
    loanAmount: "Up to ₹50 lakh",
    tenure: "Up to 7 years",
    processingFee: "0% - 2% of the loan amount + GST",
    pros: ["Lower interest than personal loans", "Flexible tenure"],
    cons: ["Vehicle serves as collateral", "Depreciation reduces loan-to-value"],
    sampleEMI: { amount: 1000000, rate: 9, months: 60 },
    gradient: "from-cyan-400 to-cyan-600",
  },
  {
    type: "Education Loan",
    icon: <GraduationCap className="w-6 h-6" />,
    description: "Education loans cover tuition fees, living expenses, and other educational costs for students.",
    interestRate: "10% p.a. onwards",
    loanAmount: "Up to ₹50 lakh",
    tenure: "Up to 15 years",
    processingFee: "0% - 2% of the loan amount + GST",
    pros: ["Covers tuition & living expenses", "Flexible repayment after course completion"],
    cons: ["Requires co-borrower or collateral for higher amounts"],
    sampleEMI: { amount: 2000000, rate: 10, months: 120 },
    gradient: "from-indigo-400 to-indigo-600",
  },
  {
    type: "Business Loan",
    icon: <Building className="w-6 h-6" />,
    description: "Business loans provide funds for starting, expanding, or running a business.",
    interestRate: "11% p.a. onwards",
    loanAmount: "Up to ₹2 crore",
    tenure: "Up to 10 years",
    processingFee: "0% - 3% of the loan amount + GST",
    pros: ["Funds for business expansion", "Flexible repayment options"],
    cons: ["Higher interest rates for unsecured loans", "Business financials scrutinized"],
    sampleEMI: { amount: 1000000, rate: 11, months: 60 },
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    type: "Loan Against Property",
    icon: <DollarSign className="w-6 h-6" />,
    description: "Secure a loan by mortgaging your residential or commercial property.",
    interestRate: "9% p.a. onwards",
    loanAmount: "Up to ₹5 crore",
    tenure: "Up to 15 years",
    processingFee: "0.25% - 1% of the loan amount + GST",
    pros: ["Lower interest rates", "High loan amount"],
    cons: ["Property required as collateral", "Longer approval process"],
    sampleEMI: { amount: 2000000, rate: 9, months: 180 },
    gradient: "from-sky-500 to-blue-500",
  },
];

// EMI calculation function
const calculateEMI = (principal, rate, months) => {
  const R = rate / 12 / 100;
  const N = months;
  const emi = (principal * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  return emi.toFixed(2);
};

function Getknowloans() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full mb-6 shadow-lg">
            <IndianRupee className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-4">
            Loan Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the perfect loan for your needs. Click on any card to explore detailed information.
          </p>
        </div>

        {/* Loan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loanData.map((loan, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-500 cursor-pointer group ${
                expandedIndex === index 
                  ? 'md:col-span-2 lg:col-span-3 bg-white/60 shadow-xl' 
                  : 'bg-white/40 hover:bg-white/60 hover:shadow-lg'
              }`}
              onClick={() => toggleExpand(index)}
            >
              {/* Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${loan.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
              <div className="relative bg-white/80 backdrop-blur-xl m-0.5 rounded-2xl p-6 h-full border border-blue-100">
                
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${loan.gradient} shadow-md`}>
                      {loan.icon}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{loan.type}</h2>
                  </div>
                  <div className="text-blue-500">
                    {expandedIndex === index ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>

                {/* Compact Info */}
                {expandedIndex !== index && (
                  <div className="space-y-3">
                    <p className="text-gray-600 text-sm line-clamp-2">{loan.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Interest Rate</p>
                        <p className="text-gray-800 font-semibold">{loan.interestRate}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Max Amount</p>
                        <p className="text-gray-800 font-semibold">{loan.loanAmount}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Sample EMI</p>
                      <p className="text-lg font-bold text-blue-600">
                        ₹{calculateEMI(loan.sampleEMI.amount, loan.sampleEMI.rate, loan.sampleEMI.months)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Expanded Details */}
                {expandedIndex === index && (
                  <div className="space-y-6 animate-in slide-in-from-top duration-300">
                    <p className="text-gray-700 leading-relaxed">{loan.description}</p>
                    
                    {/* Key Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                        <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
                        <p className="text-gray-800 font-bold">{loan.interestRate}</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                        <p className="text-xs text-gray-500 mb-1">Max Amount</p>
                        <p className="text-gray-800 font-bold">{loan.loanAmount}</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                        <p className="text-xs text-gray-500 mb-1">Tenure</p>
                        <p className="text-gray-800 font-bold">{loan.tenure}</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                        <p className="text-xs text-gray-500 mb-1">Processing Fee</p>
                        <p className="text-gray-800 font-bold text-xs">{loan.processingFee}</p>
                      </div>
                    </div>

                    {/* EMI Calculation */}
                    <div className="bg-gradient-to-r from-blue-100 to-sky-100 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Sample EMI for ₹{(loan.sampleEMI.amount / 100000).toFixed(0)} lakh</p>
                          <p className="text-2xl font-bold text-blue-600">
                            ₹{calculateEMI(loan.sampleEMI.amount, loan.sampleEMI.rate, loan.sampleEMI.months)}
                          </p>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <p>{loan.sampleEMI.rate}% for {loan.sampleEMI.months} months</p>
                        </div>
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                        <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Advantages
                        </h4>
                        <ul className="space-y-2">
                          {loan.pros.map((pro, i) => (
                            <li key={i} className="text-gray-700 text-sm flex items-start">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                        <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          Considerations
                        </h4>
                        <ul className="space-y-2">
                          {loan.cons.map((con, i) => (
                            <li key={i} className="text-gray-700 text-sm flex items-start">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-blue-100">
                      <button 
                        className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r ${loan.gradient} text-white font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Learn More About {loan.type}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-blue-200 shadow-lg">
            <p className="text-gray-700 text-sm leading-relaxed">
              <span className="text-blue-600 font-semibold">⚠️ Disclaimer:</span> Always read the terms and conditions of the loan before applying. 
              Rates may vary based on bank, credit score, and eligibility. The EMI calculations are indicative and may differ from actual offerings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Getknowloans;