import React, { useState } from 'react';
import '../styles/navy-theme.css';

const LoanApplicationGuide = () => {
  const [currentView, setCurrentView] = useState('guide'); // 'guide' or 'application'
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Information
    loanType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    
    // Employment Details
    employmentStatus: '',
    employerName: '',
    jobTitle: '',
    monthlyIncome: '',
    yearsEmployed: '',
    
    // Loan Details
    loanAmount: '',
    loanPurpose: '',
    loanTerm: '',
    
    // Documents
    hasIdentityProof: false,
    hasAddressProof: false,
    hasIncomeProof: false,
    
    // Additional Information
    existingLoans: '',
    creditScore: '',
    monthlyExpenses: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleStartApplication = () => {
    setCurrentView('application');
    window.scrollTo(0, 0);
  };
  
  const handleNext = () => {
    setActiveStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 2000);
  };
  
  const steps = [
    {
      title: "Personal Information",
      description: "The first step requires your basic personal details.",
      items: [
        "Full name (as it appears on your ID)",
        "Email address (that you check regularly)",
        "Phone number for contact",
        "Current residential address",
        "Loan type selection"
      ],
      tip: "Make sure your contact information is accurate as all communications regarding your application will be sent to these contacts."
    },
    {
      title: "Employment Details",
      description: "Information about your current employment status and income.",
      items: [
        "Current employment status",
        "Employer name and contact details",
        "Job title and department",
        "Monthly income before taxes",
        "Length of employment in years"
      ],
      tip: "Higher income and longer employment duration typically improve your chances of loan approval."
    },
    {
      title: "Loan Details",
      description: "Specifics about the loan you're requesting.",
      items: [
        "Loan amount needed",
        "Purpose of the loan",
        "Preferred repayment term"
      ],
      tip: "Be specific about your loan purpose. Vague purposes may delay your application process."
    },
    {
      title: "Required Documents",
      description: "Documents you'll need to have ready for verification.",
      items: [
        "Government-issued ID (passport/driver's license)",
        "Proof of address (utility bill/bank statement)",
        "Proof of income (pay stubs/tax returns)"
      ],
      tip: "Documents should be recent (usually within the last 3 months) and clearly legible."
    },
    {
      title: "Additional Information",
      description: "Other financial details that affect your application.",
      items: [
        "Number of existing loans",
        "Current credit score",
        "Monthly expenses"
      ],
      tip: "Being honest about your existing financial obligations helps us provide you with a suitable loan offer."
    }
  ];
  
  // Calculate the step completion percentage
  const progressPercentage = ((activeStep + 1) / steps.length) * 100;
  
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="navy-gradient-light p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium navy-text mb-2">Personal Information</h3>
              <p className="navy-subtext">Please provide your accurate personal details so we can contact you regarding your application.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium navy-text mb-1">Loan Type</label>
                <select 
                  name="loanType" 
                  value={formData.loanType} 
                  onChange={handleChange}
                  className="navy-input w-full"
                  required
                >
                  <option value="">Select Loan Type</option>
                  <option value="personal">Personal Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="home">Home Loan</option>
                  <option value="education">Education Loan</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium navy-text mb-1">First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange}
                  className="navy-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium navy-text mb-1">Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange}
                  className="navy-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium navy-text mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="navy-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium navy-text mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  className="navy-input w-full"
                  required
                />
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium navy-text mb-1">Address</label>
                <textarea 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange}
                  className="navy-input w-full"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="navy-gradient-light p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium navy-text mb-2">Employment Details</h3>
              <p className="navy-subtext">Your employment information helps us determine your loan eligibility and terms.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium navy-text mb-1">Employment Status</label>
                <select 
                  name="employmentStatus" 
                  value={formData.employmentStatus} 
                  onChange={handleChange}
                  className="navy-input w-full"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="business">Business Owner</option>
                  <option value="retired">Retired</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium navy-text mb-1">Employer Name</label>
                <input 
                  type="text" 
                  name="employerName" 
                  value={formData.employerName} 
                  onChange={handleChange}
                  className="navy-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium navy-text mb-1">Job Title</label>
                <input 
                  type="text" 
                  name="jobTitle" 
                  value={formData.jobTitle} 
                  onChange={handleChange}
                  className="navy-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium navy-text mb-1">Monthly Income ($)</label>
                <input 
                  type="number" 
                  name="monthlyIncome" 
                  value={formData.monthlyIncome} 
                  onChange={handleChange}
                  className="navy-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium navy-text mb-1">Years Employed</label>
                <input 
                  type="number" 
                  name="yearsEmployed" 
                  value={formData.yearsEmployed} 
                  onChange={handleChange}
                  className="navy-input w-full"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="navy-gradient-light p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium navy-text mb-2">Loan Details</h3>
              <p className="navy-subtext">Tell us about the loan you're looking for and how you plan to use it.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium navy-text mb-1">Loan Amount ($)</label>
                <input 
                  type="number" 
                  name="loanAmount" 
                  value={formData.loanAmount} 
                  onChange={handleChange}
                  className="navy-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium navy-text mb-1">Loan Purpose</label>
                <textarea 
                  name="loanPurpose" 
                  value={formData.loanPurpose} 
                  onChange={handleChange}
                  className="navy-input w-full"
                  rows="3"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium navy-text mb-1">Loan Term</label>
                <select 
                  name="loanTerm" 
                  value={formData.loanTerm} 
                  onChange={handleChange}
                  className="navy-input w-full"
                  required
                >
                  <option value="">Select Term</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="48">48 months</option>
                  <option value="60">60 months</option>
                </select>
              </div>
            </div>
          </div>
        );
        case 3:
          return (
            <div className="space-y-4">
              <div className="navy-gradient-light p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium navy-text mb-2">Required Documents</h3>
                <p className="navy-subtext">Confirm you have the necessary documents to complete your loan application.</p>
              </div>
              
              <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="mb-4">Please confirm that you have the following documents ready for verification:</p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      id="hasIdentityProof" 
                      name="hasIdentityProof" 
                      checked={formData.hasIdentityProof} 
                      onChange={handleChange}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor="hasIdentityProof" className="font-medium navy-text">Government-issued ID</label>
                      <p className="text-sm text-gray-500 navy-subtext">Passport, driver's license, or national ID card</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      id="hasAddressProof" 
                      name="hasAddressProof" 
                      checked={formData.hasAddressProof} 
                      onChange={handleChange}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor="hasAddressProof" className="font-medium">Proof of Address</label>
                      <p className="text-sm text-gray-500">Utility bill or bank statement from the last 3 months</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      id="hasIncomeProof" 
                      name="hasIncomeProof" 
                      checked={formData.hasIncomeProof} 
                      onChange={handleChange}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor="hasIncomeProof" className="font-medium">Proof of Income</label>
                      <p className="text-sm text-gray-500">Recent pay stubs, tax returns, or bank statements</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                  <p className="text-sm">
                    <strong>Note:</strong> You don't need to upload these documents now, but they will be required 
                    during the verification process. Having them ready will speed up your application.
                  </p>
                </div>
              </div>
            </div>
          );
        case 4:
          return (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Additional Information</h3>
                <p className="text-gray-600">Help us better understand your financial situation.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Existing Loans</label>
                  <input 
                    type="number" 
                    name="existingLoans" 
                    value={formData.existingLoans} 
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credit Score (if known)</label>
                  <input 
                    type="number" 
                    name="creditScore" 
                    value={formData.creditScore} 
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="300"
                    max="850"
                    required
                  />
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Expenses ($)</label>
                  <input 
                    type="number" 
                    name="monthlyExpenses" 
                    value={formData.monthlyExpenses} 
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg mt-6">
                <p className="text-sm text-green-800">
                  <strong>Almost done!</strong> Review all information before submitting your application.
                  Our team will evaluate your application based on the information provided.
                </p>
              </div>
            </div>
          );
        default:
          return null;
      }
    };
    
    // Render the application view
    const renderApplicationView = () => (
      <div className="navy-bg-light min-h-screen py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="navy-heading text-3xl font-bold mb-2">Loan Application</h1>
            <p className="navy-subtext">Complete all required fields to submit your application</p>
          </div>
          
          {/* Progress bar */}
          <div className="mb-8">
            <div className="navy-progress-container">
              <div 
                className="navy-progress-bar transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 navy-subtext">
              <span>Step {activeStep + 1} of {steps.length}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
          </div>
          
          {/* Step indicators */}
          <div className="flex mb-8 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex-shrink-0 flex flex-col items-center mx-2 first:ml-0 last:mr-0"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  index < activeStep ? 'navy-step-completed' : 
                  index === activeStep ? 'navy-step-active' : 
                  'navy-step-incomplete'
                }`}>
                  {index < activeStep ? '✓' : index + 1}
                </div>
                <span className="text-xs whitespace-nowrap navy-subtext">{step.title}</span>
              </div>
            ))}
          </div>
          
          {/* Form container */}
          <div className="navy-card mb-8">
            <div className="px-6 py-8">
              {renderStepContent(activeStep)}
            </div>
            
            {/* Navigation buttons */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
              <button
                onClick={handleBack}
                disabled={activeStep === 0}
                className={`${
                  activeStep === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'navy-btn-secondary'
                }`}
              >
                Previous
              </button>
              
              <button
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                className="navy-btn-primary"
              >
                {activeStep === steps.length - 1 ? 'Submit Application' : 'Next Step'}
              </button>
            </div>
          </div>
          
          {/* Help section */}
          <div className="text-center navy-subtext">
            <p>Need help with your application? <button className="navy-text font-medium">Contact Support</button></p>
          </div>
        </div>
      </div>
    );

    // Render the guide view
    const renderGuideView = () => (
      <div className="navy-bg-light min-h-screen">
        {/* Hero Banner */}
        <div className="navy-gradient-primary text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Apply for Your Loan Today</h1>
            <p className="text-xl mb-8">Fast approval, competitive rates, and a simple application process</p>
            <button 
              onClick={handleStartApplication}
              className="navy-btn-secondary transform hover:-translate-y-1"
            >
              Start Your Application
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        {currentView === 'guide' ? renderGuideView() : renderApplicationView()}
        
        {/* Success modal */}
        {isSubmitted && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="navy-card max-w-md w-full p-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full navy-bg-light navy-text text-2xl mb-4">
                  ✓
                </div>
                <h2 className="text-2xl font-bold navy-text">Application Submitted!</h2>
              </div>
              
              <p className="navy-subtext mb-6 text-center">
                Thank you for your application. We've received your information and will review it shortly.
                You'll receive an email confirmation with your application reference number.
              </p>
              
              <div className="navy-alert-info mb-6">
                <p className="navy-text font-medium">What happens next?</p>
                <ul className="mt-2 navy-subtext">
                  <li className="mb-1">• We'll review your application within 2-3 business days</li>
                  <li className="mb-1">• You may be contacted for additional information</li>
                  <li>• Final decision will be communicated via email</li>
                </ul>
              </div>
              
              <button 
                onClick={() => setIsSubmitted(false)}
                className="navy-btn-primary w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
};

export default LoanApplicationGuide;