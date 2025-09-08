import React, { useState } from 'react';
import { Briefcase, CheckCircle, AlertCircle, Info, FileText, TrendingUp, Building } from 'lucide-react';
import { ArrowBackIosNew } from '@mui/icons-material';

const Employment = () => {
  const [employmentType, setEmploymentType] = useState('');
  const [experience, setExperience] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [salaryMode, setSalaryMode] = useState('');
  const [showTips, setShowTips] = useState(false);
  const [showSalaryCalculator, setShowSalaryCalculator] = useState(false);
  const [showStabilityAnalyzer, setShowStabilityAnalyzer] = useState(false);
  const [currentSalary, setCurrentSalary] = useState('');
  const [salaryInsights, setSalaryInsights] = useState([]);
  const [jobChanges, setJobChanges] = useState('');
  const [stabilityInfo, setStabilityInfo] = useState({ icon: '⚖️', rating: 'N/A' });
  const [loading, setLoading] = useState(false);

  const calculateScore = () => {
    let score = 0;
    
    // Experience scoring
    if (parseInt(experience) >= 5) score += 35;
    else if (parseInt(experience) >= 2) score += 25;
    else if (parseInt(experience) >= 1) score += 15;
    
    // Employment type scoring
    if (employmentType === 'permanent') score += 25;
    else if (employmentType === 'contract') score += 15;
    else if (employmentType === 'self-employed') score += 20;
    
    // Company size scoring
    if (companySize === 'large') score += 25;
    else if (companySize === 'medium') score += 20;
    else if (companySize === 'small') score += 15;
    
    // Salary mode scoring
    if (salaryMode === 'bank') score += 15;
    else if (salaryMode === 'cash') score += 5;
    
    return Math.min(score, 100);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreStatus = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const score = calculateScore();

  return (
    <div className="max-w-10xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <ArrowBackIosNew className="w-6 h-6 text-gray-600 m-4 cursor-pointer" onClick={() => window.history.back()} />
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Employment</h2>
            <p className="text-green-100 text-sm">Income stability verification</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Score Display */}
        {(employmentType || experience || companySize || salaryMode) && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Employment Strength</span>
              <div className="flex items-center space-x-2">
                <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
                  {score}/100
                </span>
                <CheckCircle className={`w-5 h-5 ${getScoreColor(score)}`} />
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    score >= 80 ? 'bg-green-500' : 
                    score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
              <p className={`text-sm mt-1 font-medium ${getScoreColor(score)}`}>
                {getScoreStatus(score)}
              </p>
            </div>
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employment Type
            </label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select type</option>
              <option value="permanent">Permanent Employee</option>
              <option value="contract">Contract Employee</option>
              <option value="self-employed">Self Employed</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Experience (years)
            </label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Enter years"
              step="0.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Size
            </label>
            <select
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select size</option>
              <option value="large">Large (500+ employees)</option>
              <option value="medium">Medium (50-500 employees)</option>
              <option value="small">Small (1-50 employees)</option>
              <option value="startup">Startup</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Payment Mode
            </label>
            <select
              value={salaryMode}
              onChange={(e) => setSalaryMode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select mode</option>
              <option value="bank">Bank Transfer</option>
              <option value="cash">Cash Payment</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={() => setShowSalaryCalculator(!showSalaryCalculator)}
            className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <span className="text-lg">💰</span>
            <span className="font-semibold text-sm">Salary Insights</span>
          </button>

          <button
            onClick={() => setShowStabilityAnalyzer(!showStabilityAnalyzer)}
            className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <span className="text-lg">📊</span>
            <span className="font-semibold text-sm">Stability Score</span>
          </button>
        </div>

        {/* Salary Calculator */}
        {showSalaryCalculator && (
          <div className="mt-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-200 animate-fadeIn">
            <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
              <span className="mr-2">💰</span>
              Salary Analysis
            </h4>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monthly Salary (₹)
              </label>
              <input
                type="number"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)}
                className="w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white"
                placeholder="Enter your monthly salary"
              />
            </div>

            {salaryInsights && salaryInsights.length > 0 && (
              <div className="space-y-2">
                {salaryInsights.map((insight, index) => (
                  <div key={index} className="bg-white/70 rounded-lg p-3 flex items-center space-x-3">
                    <span className="text-lg">{insight.icon}</span>
                    <span className={`text-sm font-medium ${insight.color}`}>
                      {insight.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stability Analyzer */}
        {showStabilityAnalyzer && (
          <div className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200 animate-fadeIn">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center">
              <span className="mr-2">📈</span>
              Employment Stability Analysis
            </h4>
            
            <div className="space-y-3">
              <div className="bg-white/70 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Experience Level</span>
                  <span className="font-semibold text-blue-600">
                    {parseInt(experience) >= 5 ? 'Senior' : parseInt(experience) >= 2 ? 'Mid-level' : 'Junior'}
                  </span>
                </div>
              </div>
              
              <div className="bg-white/70 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Job Mobility</span>
                  <span className="font-semibold text-blue-600">
                    {parseInt(jobChanges) <= 1 ? 'Very Stable' : 
                     parseInt(jobChanges) <= 3 ? 'Moderate' : 'High'}
                  </span>
                </div>
              </div>
              
              <div className="bg-white/70 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Loan Risk Level</span>
                  <span className={`font-semibold ${score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {score >= 70 ? 'Low Risk' : score >= 50 ? 'Medium Risk' : 'Higher Risk'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employment Stability Indicator */}
        {experience && (
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-inner">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">
                  Stability Score: {stabilityInfo.rating}
                </p>
                <p className="text-xs text-green-600">
                  Based on {experience} years experience and {jobChanges || 0} job changes
                </p>
              </div>
              <div className="ml-auto text-2xl">
                {stabilityInfo.icon}
              </div>
            </div>
          </div>
        )}

        {/* Tips Toggle */}
        <button
          onClick={() => setShowTips(!showTips)}
          className="w-full mt-6 bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Info className="w-4 h-4" />
          <span className="font-medium">
            {showTips ? 'Hide Tips' : 'Show Employment Tips'}
          </span>
        </button>

        {/* Tips Section */}
        {showTips && (
          <div className="mt-4 bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-3 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Employment Tips
            </h4>
            <ul className="space-y-2 text-sm text-green-700">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                Maintain stable employment for 2+ years
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                Ensure salary is credited via bank transfer
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                Keep employment certificates updated
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                For self-employed: maintain GST filings
              </li>
            </ul>
          </div>
        )}

        {/* Required Documents */}
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Required Documents
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Appointment/offer letter</li>
            <li>• Last 3-6 months salary slips</li>
            <li>• Form-16 or ITR (last 2 years)</li>
            <li>• Employment verification letter</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Employment;