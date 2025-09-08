import React, { useState } from 'react';
import { Building, CheckCircle, AlertCircle, Calculator, TrendingUp } from 'lucide-react';
import { ArrowBackIos } from '@mui/icons-material';
const BankAccount = () => {
  const [accountAge, setAccountAge] = useState(6);
  const [balance, setBalance] = useState(50000);
  const [overdrafts, setOverdrafts] = useState(0);
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const calculateScore = () => {
    let score = 0;
    if (accountAge >= 6) score += 40;
    if (balance >= 25000) score += 30;
    if (overdrafts === 0) score += 30;
    return score;
  };
  
  const score = calculateScore();
  
  return (
    <div className="max-w-10xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl p-8 border border-blue-200">
      <ArrowBackIos className="w-6 h-6 text-gray-600 mb-4 cursor-pointer" onClick={() => window.history.back()} />
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-blue-500 rounded-xl">
          <Building className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Bank Account</h2>
          <p className="text-gray-600">Active account with minimum 6 months history</p>
        </div>
      </div>

      {/* Interactive Score Calculator */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Account Health Score</h3>
          <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score}/100
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>

        {/* Interactive Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Age (months): {accountAge}
            </label>
            <input
              type="range"
              min="1"
              max="60"
              value={accountAge}
              onChange={(e) => setAccountAge(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Balance: ₹{balance.toLocaleString()}
            </label>
            <input
              type="range"
              min="5000"
              max="500000"
              step="5000"
              value={balance}
              onChange={(e) => setBalance(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overdrafts (last 6 months): {overdrafts}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={overdrafts}
              onChange={(e) => setOverdrafts(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Requirements Checklist</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            {accountAge >= 6 ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="text-gray-700">Minimum 6 months account history</span>
          </div>
          <div className="flex items-center space-x-3">
            {balance >= 25000 ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="text-gray-700">Maintain adequate balance</span>
          </div>
          <div className="flex items-center space-x-3">
            {overdrafts === 0 ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="text-gray-700">No overdrafts</span>
          </div>
        </div>
      </div>

      {/* Grid Layout for Tips and Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Quick Tips */}
        <div className="bg-blue-500 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white">
          <h3 className="text-lg font-semibold mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2 text-sm">
            <li>• Keep consistent transaction patterns</li>
            <li>• Avoid frequent account closures</li>
            <li>• Maintain emergency fund balance</li>
            <li>• Use digital banking for better records</li>
          </ul>
        </div>

        {/* Documents Required */}
        <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">📄 Documents to Carry</h3>
          <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>6-month bank statements</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Cancelled cheque</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>IFSC details</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Account opening form</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccount;