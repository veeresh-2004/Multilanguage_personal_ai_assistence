import React, { useState, useEffect } from 'react';
import { Home, Shield, TrendingUp, MapPin, CheckCircle, AlertTriangle, Star, Zap } from 'lucide-react';

const Property = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [isValidating, setIsValidating] = useState(false);

  // Pre-defined property scenarios with realistic data
  const propertyScenarios = [
    {
      id: 1,
      name: "Modern Apartment in Whitefield",
      type: "3BHK Apartment",
      value: "₹85 Lakhs",
      location: "Whitefield, Bengaluru",
      age: 3,
      image: "🏢",
      legalStatus: {
        clearTitle: true,
        approvedPlan: true,
        taxUpdated: true,
        noc: true
      },
      valuation: {
        marketRate: "₹6,200/sqft",
        appreciation: "+12% (3 years)",
        loanEligible: "₹68 Lakhs (80%)"
      },
      riskLevel: "low",
      score: 92
    },
    {
      id: 2,
      name: "Independent Villa in HSR Layout",
      type: "4BHK Villa",
      value: "₹1.2 Crores",
      location: "HSR Layout, Bengaluru",
      age: 8,
      image: "🏡",
      legalStatus: {
        clearTitle: true,
        approvedPlan: true,
        taxUpdated: false,
        noc: true
      },
      valuation: {
        marketRate: "₹8,500/sqft",
        appreciation: "+18% (5 years)",
        loanEligible: "₹90 Lakhs (75%)"
      },
      riskLevel: "medium",
      score: 78
    },
    {
      id: 3,
      name: "Plot in Electronic City",
      type: "Residential Plot",
      value: "₹45 Lakhs",
      location: "Electronic City, Bengaluru",
      age: 0,
      image: "🏞️",
      legalStatus: {
        clearTitle: false,
        approvedPlan: true,
        taxUpdated: true,
        noc: false
      },
      valuation: {
        marketRate: "₹4,100/sqft",
        appreciation: "+8% (2 years)",
        loanEligible: "₹27 Lakhs (60%)"
      },
      riskLevel: "high",
      score: 45
    }
  ];

  const validateProperty = (property) => {
    setIsValidating(true);
    setAnimationStep(0);
    
    // Animated validation steps
    const steps = ['Checking Legal Documents', 'Verifying Property Value', 'Calculating Risk Score', 'Generating Report'];
    
    steps.forEach((step, index) => {
      setTimeout(() => {
        setAnimationStep(index + 1);
        if (index === steps.length - 1) {
          setIsValidating(false);
        }
      }, (index + 1) * 800);
    });
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl shadow-2xl border border-indigo-200">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white shadow-lg">
            <Home size={32} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Smart Property Validator
          </h2>
        </div>
        <p className="text-gray-600 text-lg">AI-powered property analysis for loan eligibility</p>
      </div>

      {!selectedProperty ? (
        <div className="grid md:grid-cols-3 gap-6">
          {propertyScenarios.map((property) => (
            <div 
              key={property.id}
              onClick={() => setSelectedProperty(property)}
              className="group cursor-pointer bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-200 hover:border-indigo-300"
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-3 group-hover:animate-bounce">
                  {property.image}
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{property.name}</h3>
                <p className="text-gray-600 text-sm">{property.type}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Value:</span>
                  <span className="font-bold text-indigo-600">{property.value}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Location:</span>
                  <span className="text-sm font-medium text-gray-700">{property.location.split(',')[0]}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Risk Level:</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRiskColor(property.riskLevel)}`}>
                    {property.riskLevel.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Property Score</span>
                  <div className="flex items-center gap-2">
                    <div className={`text-xl font-bold ${getScoreColor(property.score)}`}>
                      {property.score}
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={i < Math.floor(property.score / 20) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Back Button */}
          <button 
            onClick={() => {setSelectedProperty(null); setAnimationStep(0);}}
            className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-2"
          >
            ← Back to Properties
          </button>

          {/* Property Header */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-7xl">{selectedProperty.image}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedProperty.name}</h3>
                  <p className="text-gray-600 mb-1">{selectedProperty.type}</p>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin size={16} />
                    <span>{selectedProperty.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-indigo-600 mb-2">{selectedProperty.value}</div>
                <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${getRiskColor(selectedProperty.riskLevel)}`}>
                  {selectedProperty.riskLevel.toUpperCase()} RISK
                </div>
              </div>
            </div>

            {/* Validation Button */}
            <button
              onClick={() => validateProperty(selectedProperty)}
              disabled={isValidating}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isValidating ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Validating Property...
                </>
              ) : (
                <>
                  <Zap size={24} />
                  Start Smart Validation
                </>
              )}
            </button>
          </div>

          {/* Validation Progress */}
          {isValidating && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="animate-pulse w-3 h-3 bg-indigo-500 rounded-full"></div>
                Validation in Progress
              </h4>
              <div className="space-y-4">
                {['Checking Legal Documents', 'Verifying Property Value', 'Calculating Risk Score', 'Generating Report'].map((step, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${index < animationStep ? 'bg-green-50 text-green-700' : index === animationStep - 1 ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-50 text-gray-500'}`}>
                    {index < animationStep ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : index === animationStep - 1 ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500"></div>
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                    )}
                    <span className="font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {animationStep >= 4 && !isValidating && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Legal Status */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Shield className="text-purple-500" size={20} />
                  Legal Clearance Status
                </h4>
                <div className="space-y-3">
                  {Object.entries(selectedProperty.legalStatus).map(([key, status]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <div className={`flex items-center gap-2 ${status ? 'text-green-600' : 'text-red-600'}`}>
                        {status ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
                        <span className="font-bold">{status ? 'Clear' : 'Pending'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Valuation Details */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="text-green-500" size={20} />
                  Property Valuation
                </h4>
                <div className="space-y-4">
                  {Object.entries(selectedProperty.valuation).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-bold text-indigo-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overall Score */}
              <div className="md:col-span-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-white shadow-lg">
                <div className="text-center">
                  <h4 className="text-2xl font-bold mb-4">Property Validation Score</h4>
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-6xl font-bold">{selectedProperty.score}</div>
                    <div className="text-left">
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={24} 
                            className={i < Math.floor(selectedProperty.score / 20) ? 'text-yellow-300 fill-current' : 'text-white/30'} 
                          />
                        ))}
                      </div>
                      <p className="text-xl font-medium">
                        {selectedProperty.score >= 80 ? 'Excellent for Loan' : 
                         selectedProperty.score >= 60 ? 'Good with Conditions' : 
                         'Needs Improvement'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Property;