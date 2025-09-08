import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Users, Building, Briefcase, Star, Target, Zap } from 'lucide-react';

const Income = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Pre-defined income profiles with realistic scenarios
  const incomeProfiles = [
    {
      id: 1,
      name: "Software Engineer",
      icon: "💻",
      monthlyIncome: 85000,
      additionalIncome: 15000,
      monthlyDebt: 25000,
      incomeType: "Salaried",
      experience: "5 years",
      company: "Tech MNC",
      stability: "high",
      documents: ["Salary Slips", "Form-16", "Bank Statement"],
      color: "blue"
    },
    {
      id: 2,
      name: "Business Owner",
      icon: "🏢",
      monthlyIncome: 120000,
      additionalIncome: 35000,
      monthlyDebt: 40000,
      incomeType: "Business",
      experience: "8 years",
      company: "Manufacturing Unit",
      stability: "medium",
      documents: ["ITR", "GST Returns", "Bank Statement", "P&L Statement"],
      color: "purple"
    },
    {
      id: 3,
      name: "Marketing Manager",
      icon: "📊",
      monthlyIncome: 65000,
      additionalIncome: 12000,
      monthlyDebt: 35000,
      incomeType: "Salaried",
      experience: "7 years",
      company: "FMCG Company",
      stability: "high",
      documents: ["Salary Slips", "Form-16", "Appraisal Letter"],
      color: "green"
    },
    {
      id: 4,
      name: "Freelance Consultant",
      icon: "🎯",
      monthlyIncome: 75000,
      additionalIncome: 20000,
      monthlyDebt: 18000,
      incomeType: "Freelance",
      experience: "4 years",
      company: "Multiple Clients",
      stability: "low",
      documents: ["ITR", "Client Invoices", "Bank Statement", "Contract Agreements"],
      color: "orange"
    }
  ];

  const analyzeIncome = (profile) => {
    setIsAnalyzing(true);
    setAnimationStep(0);
    
    const steps = ['Calculating Income Stability', 'Assessing Debt Ratios', 'Evaluating Documentation', 'Generating Loan Eligibility'];
    
    steps.forEach((step, index) => {
      setTimeout(() => {
        setAnimationStep(index + 1);
        if (index === steps.length - 1) {
          setIsAnalyzing(false);
        }
      }, (index + 1) * 1000);
    });
  };

  const calculateMetrics = (profile) => {
    const totalIncome = profile.monthlyIncome + profile.additionalIncome;
    const debtRatio = (profile.monthlyDebt / totalIncome) * 100;
    const eligibilityScore = Math.min(100, Math.max(0, 
      (totalIncome / 1000) * 0.3 + 
      (100 - debtRatio) * 0.4 + 
      (profile.stability === 'high' ? 30 : profile.stability === 'medium' ? 20 : 10)
    ));
    
    const maxLoanAmount = Math.floor((totalIncome - profile.monthlyDebt) * 60 / 1000) * 1000;
    
    return {
      totalIncome,
      debtRatio: Math.round(debtRatio),
      eligibilityScore: Math.round(eligibilityScore),
      maxLoanAmount,
      recommendation: eligibilityScore >= 75 ? 'Excellent' : eligibilityScore >= 60 ? 'Good' : eligibilityScore >= 40 ? 'Fair' : 'Needs Improvement'
    };
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-cyan-500',
      purple: 'from-purple-500 to-pink-500',
      green: 'from-green-500 to-emerald-500',
      orange: 'from-orange-500 to-red-500'
    };
    return colors[color] || colors.blue;
  };

  const getStabilityColor = (stability) => {
    switch(stability) {
      case 'high': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-orange-50 via-white to-yellow-50 rounded-3xl shadow-2xl border border-orange-200">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full text-white shadow-lg animate-pulse">
            <DollarSign size={32} />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Smart Income Analyzer
          </h2>
        </div>
        <p className="text-gray-600 text-lg">AI-powered income assessment for instant loan eligibility</p>
      </div>

      {!selectedProfile ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {incomeProfiles.map((profile) => {
            const metrics = calculateMetrics(profile);
            return (
              <div 
                key={profile.id}
                onClick={() => setSelectedProfile(profile)}
                className="group cursor-pointer bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-200 hover:border-orange-300 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${getColorClasses(profile.color)} opacity-10 rounded-bl-full`}></div>
                
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3 group-hover:animate-bounce">
                    {profile.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{profile.name}</h3>
                  <p className="text-gray-600 text-sm">{profile.incomeType}</p>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Monthly Income:</span>
                    <span className="font-bold text-green-600">₹{profile.monthlyIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Experience:</span>
                    <span className="text-xs font-medium text-gray-700">{profile.experience}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Stability:</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStabilityColor(profile.stability)}`}>
                      {profile.stability.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Eligibility Score</span>
                    <div className={`text-lg font-bold ${metrics.eligibilityScore >= 75 ? 'text-green-600' : metrics.eligibilityScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {metrics.eligibilityScore}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${getColorClasses(profile.color)} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${metrics.eligibilityScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Back Button */}
          <button 
            onClick={() => {setSelectedProfile(null); setAnimationStep(0);}}
            className="px-6 py-3 bg-white text-orange-600 hover:bg-orange-50 rounded-xl transition-colors flex items-center gap-2 shadow-md font-medium"
          >
            ← Back to Profiles
          </button>

          {/* Profile Header */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getColorClasses(selectedProfile.color)} opacity-10 rounded-bl-full`}></div>
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="text-8xl">{selectedProfile.icon}</div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{selectedProfile.name}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} />
                      <span>{selectedProfile.incomeType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building size={16} />
                      <span>{selectedProfile.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} />
                      <span>{selectedProfile.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target size={16} />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStabilityColor(selectedProfile.stability)}`}>
                        {selectedProfile.stability.toUpperCase()} STABILITY
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={() => analyzeIncome(selectedProfile)}
              disabled={isAnalyzing}
              className={`w-full bg-gradient-to-r ${getColorClasses(selectedProfile.color)} text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3`}
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Analyzing Income Profile...
                </>
              ) : (
                <>
                  <Zap size={24} />
                  Analyze My Income Eligibility
                </>
              )}
            </button>
          </div>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="animate-pulse w-4 h-4 bg-orange-500 rounded-full"></div>
                Income Analysis in Progress
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {['Calculating Income Stability', 'Assessing Debt Ratios', 'Evaluating Documentation', 'Generating Loan Eligibility'].map((step, index) => (
                  <div key={index} className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${index < animationStep ? 'bg-green-50 text-green-700 scale-105' : index === animationStep - 1 ? 'bg-orange-50 text-orange-700' : 'bg-gray-50 text-gray-500'}`}>
                    {index < animationStep ? (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm animate-bounce">
                        ✓
                      </div>
                    ) : index === animationStep - 1 ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-3 border-orange-500"></div>
                    ) : (
                      <div className="w-8 h-8 border-3 border-gray-300 rounded-full"></div>
                    )}
                    <span className="font-semibold">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results Dashboard */}
          {animationStep >= 4 && !isAnalyzing && (() => {
            const metrics = calculateMetrics(selectedProfile);
            return (
              <div className="space-y-6">
                {/* Key Metrics Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">₹{metrics.totalIncome.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Monthly Income</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                    <div className={`text-2xl font-bold mb-2 ${metrics.debtRatio < 50 ? 'text-green-600' : 'text-red-600'}`}>{metrics.debtRatio}%</div>
                    <div className="text-sm text-gray-600">Debt-to-Income Ratio</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">₹{metrics.maxLoanAmount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Max Loan Eligible</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                    <div className={`text-2xl font-bold mb-2 ${metrics.eligibilityScore >= 75 ? 'text-green-600' : metrics.eligibilityScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {metrics.eligibilityScore}
                    </div>
                    <div className="text-sm text-gray-600">Eligibility Score</div>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Users className="text-blue-500" size={20} />
                      Income Breakdown
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium text-gray-700">Primary Income</span>
                        <span className="font-bold text-blue-600">₹{selectedProfile.monthlyIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-gray-700">Additional Income</span>
                        <span className="font-bold text-green-600">₹{selectedProfile.additionalIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="font-medium text-gray-700">Monthly Obligations</span>
                        <span className="font-bold text-red-600">₹{selectedProfile.monthlyDebt.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Star className="text-yellow-500" size={20} />
                      Required Documents
                    </h4>
                    <div className="space-y-2">
                      {selectedProfile.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-700">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Final Recommendation */}
                <div className={`bg-gradient-to-r ${getColorClasses(selectedProfile.color)} rounded-2xl p-8 text-white shadow-xl`}>
                  <div className="text-center">
                    <h4 className="text-3xl font-bold mb-4">Loan Eligibility: {metrics.recommendation}</h4>
                    <div className="flex items-center justify-center gap-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">₹{metrics.maxLoanAmount.toLocaleString()}</div>
                        <div className="text-lg opacity-90">Maximum Loan Amount</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">{metrics.eligibilityScore}</div>
                        <div className="text-lg opacity-90">Eligibility Score</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default Income;