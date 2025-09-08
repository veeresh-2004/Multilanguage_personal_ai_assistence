import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { ArrowBackIos } from '@mui/icons-material';

const CreditScore = () => {
  const [creditScore, setCreditScore] = useState(750);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [creditCards, setCreditCards] = useState(2);
  const [utilization, setUtilization] = useState(30);
  const [paymentHistory, setPaymentHistory] = useState(100);

  // Animate score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(creditScore);
    }, 500);
    return () => clearTimeout(timer);
  }, [creditScore]);

  const getScoreColor = (score) => {
    if (score >= 750) return { color: 'text-green-500', bg: 'bg-green-500', ring: 'ring-green-200' };
    if (score >= 700) return { color: 'text-blue-500', bg: 'bg-blue-500', ring: 'ring-blue-200' };
    if (score >= 650) return { color: 'text-yellow-500', bg: 'bg-yellow-500', ring: 'ring-yellow-200' };
    return { color: 'text-red-500', bg: 'bg-red-500', ring: 'ring-red-200' };
  };

  const getScoreLabel = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    return 'Poor';
  };

  const getLoanApprovalChance = (score) => {
    if (score >= 750) return 95;
    if (score >= 700) return 80;
    if (score >= 650) return 60;
    return 30;
  };

  const scoreColors = getScoreColor(creditScore);
  const circumference = 2 * Math.PI * 90;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedScore / 850) * circumference;

  return (
    <div className="w-full max-w-10xl mx-auto bg-gradient-to-br from-blue-300 to-gray-100 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border border-red-200">
      <ArrowBackIos className="w-6 h-6 text-gray-600 mb-4 cursor-pointer" onClick={() => window.history.back()} />
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-red-500 rounded-xl">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Credit Score</h2>
          <p className="text-gray-600">Good credit history and score</p>
        </div>
      </div>

      {/* Credit Score Gauge */}
      <div className="bg-white rounded-xl p-8 mb-6 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48 mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-gray-200"
              />
              {/* Progress circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className={`${scoreColors.color} transition-all duration-1000 ease-out`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-4xl font-bold ${scoreColors.color}`}>
                {Math.round(animatedScore)}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {getScoreLabel(creditScore)}
              </div>
            </div>
          </div>

          {/* Score Range Indicators */}
          <div className="flex justify-between w-full max-w-sm text-xs text-gray-500">
            <span>300</span>
            <span>550</span>
            <span>650</span>
            <span>750</span>
            <span>850</span>
          </div>
        </div>
      </div>

      {/* Score Simulator */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <RefreshCw className="w-5 h-5 mr-2" />
          Score Simulator
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Credit Score</label>
              <span className="text-sm text-gray-600">{creditScore}</span>
            </div>
            <input
              type="range"
              min="300"
              max="850"
              value={creditScore}
              onChange={(e) => {
                setCreditScore(parseInt(e.target.value));
                setAnimatedScore(parseInt(e.target.value));
              }}
              className="w-full"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Credit Cards</label>
              <span className="text-sm text-gray-600">{creditCards}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={creditCards}
              onChange={(e) => setCreditCards(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Credit Utilization</label>
              <span className="text-sm text-gray-600">{utilization}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={utilization}
              onChange={(e) => setUtilization(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Loan Approval Prediction */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Approval Probability</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Approval Chance</span>
              <span className="text-sm font-medium">{getLoanApprovalChance(creditScore)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${scoreColors.bg}`}
                style={{ width: `${getLoanApprovalChance(creditScore)}%` }}
              ></div>
            </div>
          </div>
          {getLoanApprovalChance(creditScore) >= 80 ? (
            <CheckCircle className="w-8 h-8 text-green-500" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          )}
        </div>
      </div>

      {/* Credit Factors */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Credit Health Factors</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Payment History</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: `${paymentHistory}%`}}></div>
              </div>
              <span className="text-sm text-gray-600">{paymentHistory}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Credit Utilization</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${utilization > 30 ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{width: `${utilization}%`}}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{utilization}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Credit Mix</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: `${Math.min(creditCards * 20, 100)}%`}}></div>
              </div>
              <span className="text-sm text-gray-600">Good</span>
            </div>
          </div>
        </div>
      </div>

      {/* Improvement Tips */}
      <div className="bg-red-500 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">🚀 Score Improvement Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>• Pay bills on time (35% impact)</div>
          <div>• Keep utilization below 30%</div>
          <div>• Don't close old credit cards</div>
          <div>• Check credit report regularly</div>
          <div>• Avoid multiple loan applications</div>
          <div>• Maintain credit mix diversity</div>
        </div>
      </div>

      {/* Documents Required */}
      <div className="mt-6 bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">📄 Documents for Verification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
          <div>✓ Latest credit report</div>
          <div>✓ Credit card statements</div>
          <div>✓ Loan closure certificates</div>
          <div>✓ No dues certificate</div>
        </div>
      </div>
    </div>
  );
};

export default CreditScore;