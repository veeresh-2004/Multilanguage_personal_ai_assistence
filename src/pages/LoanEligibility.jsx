import { useState } from "react";
import "../styles/LoanEligibility.css";
import { useTranslation } from 'react-i18next';
import TextToSpeech from '../components/TextToSpeech';

export default function LoanEligibility() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pan: "",
    aadhar: "",
    loanType: "",
    occupation: "",
    income: "",
    age: "",
    email: "",
    sex: "",
    existingLoans: "",
    creditScore: "",
    employmentType: "",
    employmentDuration: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    loanAmount: "",
    loanTenure: "",
  });
  
  const [message, setMessage] = useState("");
  const [eligibilityDetails, setEligibilityDetails] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  // Basic form validation
  const validateForm = () => {
    const { phone, pan, aadhar, age, income, creditScore } = formData;
    
    if (!/^[0-9]{10}$/.test(phone))
      return "Phone number must be exactly 10 digits.";
    
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan))
      return "PAN must be in format ABCDE1234F.";
    
    if (!/^[0-9]{12}$/.test(aadhar)) 
      return "Aadhar must be exactly 12 digits.";
    
    if (parseInt(age) < 18) 
      return "You must be at least 18 years old to apply for a loan.";
    
    if (parseInt(age) > 75) 
      return "Maximum age limit for most loans is 75 years.";
    
    if (parseInt(income) <= 0) 
      return "Please enter a valid income amount.";
    
    if (creditScore && (parseInt(creditScore) < 300 || parseInt(creditScore) > 900))
      return "Credit score must be between 300 and 900.";
    
    return "";
  };

  // Check eligibility based on loan type and financial details
  const checkEligibility = () => {
    const { loanType, income, age, creditScore, employmentType, employmentDuration, existingLoans, loanAmount } = formData;
    
    // Convert values to numeric for calculations
    const numericIncome = parseInt(income) || 0;
    const numericAge = parseInt(age) || 0;
    const numericCreditScore = parseInt(creditScore) || 650; // Default to average if not provided
    const numericExistingLoans = parseInt(existingLoans) || 0;
    const numericLoanAmount = parseInt(loanAmount) || 0;
    
    // Initialize result object
    const result = {
      eligible: false,
      maxEligibleAmount: 0,
      suggestedInterestRate: 0,
      reasons: [],
      recommendations: []
    };

    // Basic eligibility check based on income to loan ratio
    let maxEmiPercentage = 0.5; // Default: 50% of monthly income
    
    // Different criteria based on loan type
    switch(loanType) {
      case "Home Loan":
        maxEmiPercentage = 0.6;
        result.maxEligibleAmount = numericIncome * 5;
        result.suggestedInterestRate = 7.5 + (numericCreditScore < 750 ? 1 : 0);
        
        if (numericAge > 45) {
          result.maxEligibleAmount *= 0.8;
          result.recommendations.push("Since you're over 45, consider a shorter loan tenure");
        }
        
        if (numericCreditScore < 650) {
          result.reasons.push("Low credit score limits home loan approval chances");
          result.suggestedInterestRate += 1;
        }
        break;
        
      case "Education Loan":
        maxEmiPercentage = 0.45;
        result.maxEligibleAmount = numericIncome * 2;
        result.suggestedInterestRate = 8.5 + (numericCreditScore < 700 ? 1 : 0);
        
        if (employmentType !== "Salaried") {
          result.recommendations.push("Education loans generally require a co-applicant for non-salaried individuals");
        }
        break;
        
      case "Personal Loan":
        maxEmiPercentage = 0.4;
        result.maxEligibleAmount = numericIncome * 1.5;
        result.suggestedInterestRate = 10.5 + (numericCreditScore < 700 ? 2 : 0);
        
        if (numericCreditScore < 700) {
          result.reasons.push("Personal loans typically require a good credit score");
          result.suggestedInterestRate += 1.5;
        }
        
        if (employmentDuration < 1) {
          result.reasons.push("Less than 1 year of employment may affect personal loan approval");
        }
        break;
        
      case "Car Loan":
        maxEmiPercentage = 0.5;
        result.maxEligibleAmount = numericIncome * 2.5;
        result.suggestedInterestRate = 9.0 + (numericCreditScore < 700 ? 1.5 : 0);
        
        if (numericExistingLoans > 2) {
          result.reasons.push("Multiple existing loans may affect car loan approval");
          result.recommendations.push("Consider settling some existing loans before applying");
        }
        break;
        
      default:
        result.reasons.push("Please select a valid loan type");
        return result;
    }
    
    if (numericLoanAmount > result.maxEligibleAmount) {
      result.reasons.push(`Requested amount exceeds your estimated eligibility of ₹${result.maxEligibleAmount.toLocaleString()}`);
      result.recommendations.push("Consider applying for a lower loan amount");
    }
    
    if (numericExistingLoans > 0) {
      const remainingIncomePercentage = 1 - (numericExistingLoans * 0.15);
      if (remainingIncomePercentage < maxEmiPercentage) {
        maxEmiPercentage = remainingIncomePercentage;
        result.reasons.push("Existing loan obligations reduce your eligibility");
      }
    }
    
    if (numericCreditScore < 600) {
      result.reasons.push("Credit score below 600 significantly affects loan approval chances");
    } else if (numericCreditScore >= 750) {
      result.recommendations.push("Your excellent credit score may qualify you for preferential interest rates");
      result.suggestedInterestRate -= 0.5;
    }
    
    if (result.reasons.length <= 1 && numericCreditScore >= 600) {
      result.eligible = true;
      if (result.reasons.length === 1 && result.reasons[0].includes("exceeds your estimated eligibility")) {
        result.eligible = false;
      }
    }
    
    result.suggestedInterestRate = Math.max(7, Math.min(18, result.suggestedInterestRate));
    
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    
    if (errorMsg) {
      setMessage(errorMsg);
      setEligibilityDetails(null);
      setIsFormValid(false);
    } else {
      setLoading(true);
      setIsFormValid(true);
      
      setTimeout(() => {
        const eligibilityResult = checkEligibility();
        setEligibilityDetails(eligibilityResult);
        setMessage(eligibilityResult.eligible 
          ? "Congratulations! You are eligible for this loan." 
          : "Based on the information provided, you may not be eligible for this loan.");
        setLoading(false);
      }, 1500);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "pan") value = value.toUpperCase();
    setFormData({ ...formData, [name]: value });
    setEligibilityDetails(null);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {t('title')}
        <TextToSpeech text={t('title')} />
      </h2>
      <form onSubmit={handleSubmit} className="loan-form">
        <div className="form-section">
          <h3>{t('personalDetails')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('name')}</label>
              <input type="text" name="name" required onChange={handleChange} value={formData.name} />
            </div>
            <div className="form-group">
              <label>{t('phone')}</label>
              <input type="text" name="phone" required onChange={handleChange} value={formData.phone} />
            </div>
            <div className="form-group">
              <label>{t('email')}</label>
              <input type="email" name="email" onChange={handleChange} value={formData.email} />
            </div>
            <div className="form-group">
              <label>{t('age')}</label>
              <input type="number" name="age" required onChange={handleChange} value={formData.age} />
            </div>
            <div className="form-group">
              <label>{t('sex')}</label>
              <select name="sex" required onChange={handleChange} value={formData.sex}>
                <option value="">{t('common.select')}</option>
                <option value="Male">{t('male')}</option>
                <option value="Female">{t('female')}</option>
                <option value="Other">{t('other')}</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>{t('identityDetails')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('pan')}</label>
              <input type="text" name="pan" required onChange={handleChange} value={formData.pan} />
            </div>
            <div className="form-group">
              <label>{t('aadhar')}</label>
              <input type="text" name="aadhar" required onChange={handleChange} value={formData.aadhar} />
            </div>
            <div className="form-group">
              <label>{t('address')}</label>
              <input type="text" name="address" onChange={handleChange} value={formData.address} />
            </div>
            <div className="form-group">
              <label>{t('city')}</label>
              <input type="text" name="city" onChange={handleChange} value={formData.city} />
            </div>
            <div className="form-group">
              <label>{t('state')}</label>
              <input type="text" name="state" onChange={handleChange} value={formData.state} />
            </div>
            <div className="form-group">
              <label>{t('pincode')}</label>
              <input type="text" name="pincode" onChange={handleChange} value={formData.pincode} />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>{t('financialDetails')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('occupation')}</label>
              <input type="text" name="occupation" required onChange={handleChange} value={formData.occupation} />
            </div>
            <div className="form-group">
              <label>{t('employmentType')}</label>
              <select name="employmentType" required onChange={handleChange} value={formData.employmentType}>
                <option value="">{t('common.select')}</option>
                <option value="Salaried">{t('salaried')}</option>
                <option value="Self-Employed">{t('selfEmployed')}</option>
                <option value="Business Owner">{t('businessOwner')}</option>
                <option value="Freelancer">{t('freelancer')}</option>
                <option value="Unemployed">{t('unemployed')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('employmentDuration')}</label>
              <input 
                type="number" 
                name="employmentDuration" 
                min="0" 
                step="0.5" 
                onChange={handleChange} 
                value={formData.employmentDuration} 
              />
            </div>
            <div className="form-group">
              <label>{t('annualIncome')}</label>
              <input 
                type="number" 
                name="income" 
                required 
                min="0" 
                onChange={handleChange} 
                value={formData.income} 
              />
            </div>
            <div className="form-group">
              <label>{t('existingLoans')}</label>
              <input 
                type="number" 
                name="existingLoans" 
                min="0" 
                onChange={handleChange} 
                value={formData.existingLoans} 
              />
            </div>
            <div className="form-group">
              <label>{t('creditScore')}</label>
              <input 
                type="number" 
                name="creditScore" 
                min="300" 
                max="900" 
                placeholder="600-900" 
                onChange={handleChange} 
                value={formData.creditScore} 
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>{t('loanDetails')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('loanType')}</label>
              <select name="loanType" required onChange={handleChange} value={formData.loanType}>
                <option value="">{t('common.select')}</option>
                <option value="Education Loan">{t('education')}</option>
                <option value="Home Loan">{t('home')}</option>
                <option value="Personal Loan">{t('personal')}</option>
                <option value="Car Loan">{t('car')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('loanAmount')}</label>
              <input 
                type="number" 
                name="loanAmount" 
                min="0" 
                onChange={handleChange} 
                value={formData.loanAmount} 
              />
            </div>
            <div className="form-group">
              <label>{t('loanTenure')}</label>
              <select name="loanTenure" onChange={handleChange} value={formData.loanTenure}>
                <option value="">{t('common.select')}</option>
                <option value="1">1 {t('year')}</option>
                <option value="2">2 {t('years')}</option>
                <option value="3">3 {t('years')}</option>
                <option value="5">5 {t('years')}</option>
                <option value="10">10 {t('years')}</option>
                <option value="15">15 {t('years')}</option>
                <option value="20">20 {t('years')}</option>
                <option value="30">30 {t('years')}</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="button-container">
          <button type="submit" disabled={loading}>
            {loading ? t('common.processing') : t('checkEligibility')}
          </button>
        </div>
        
        {message && (
          <div className={`message ${isFormValid ? (eligibilityDetails?.eligible ? "success-message" : "error-message") : "error-message"}`}>
            <span>{message}</span>
            <TextToSpeech text={message} />
          </div>
        )}
        
        {eligibilityDetails && (
          <div className="eligibility-results">
            <h3>{t('assessmentTitle')}</h3>
            
            <div className="result-grid">
              <div className="result-item">
                <span className="result-label">{t('status')}:</span>
                <span className={`result-value ${eligibilityDetails.eligible ? "eligible" : "not-eligible"}`}>
                  {eligibilityDetails.eligible ? t('eligible') : t('notEligible')}
                </span>
              </div>
              
              <div className="result-item">
                <span className="result-label">{t('maxAmount')}:</span>
                <span className="result-value">₹{eligibilityDetails.maxEligibleAmount.toLocaleString()}</span>
              </div>
              
              <div className="result-item">
                <span className="result-label">{t('interestRate')}:</span>
                <span className="result-value">{eligibilityDetails.suggestedInterestRate.toFixed(2)}%</span>
              </div>
            </div>
            
            {eligibilityDetails.reasons.length > 0 && (
              <div className="result-section">
                <h4>{t('factors')}:</h4>
                <ul>
                  {eligibilityDetails.reasons.map((reason, index) => (
                    <li key={index}>
                      {reason}
                      <TextToSpeech text={reason} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {eligibilityDetails.recommendations.length > 0 && (
              <div className="result-section">
                <h4>{t('recommendations')}:</h4>
                <ul>
                  {eligibilityDetails.recommendations.map((recommendation, index) => (
                    <li key={index}>
                      {recommendation}
                      <TextToSpeech text={recommendation} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="disclaimer">
              <p>{t('disclaimer')}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}