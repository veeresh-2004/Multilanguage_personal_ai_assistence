import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Building2, ExternalLink, Star, Filter, Loader, Award, Users, CreditCard, Calendar, IndianRupee, CheckCircle, ArrowLeft, Calculator } from 'lucide-react';

const PersonalLoansDashboard = () => {
  const [loanData, setLoanData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('interestRate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterBy, setFilterBy] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);

   const calculateEMI = () => {
    if (!loanAmount || !interestRate || !tenure) {
      alert("Please fill all fields");
      return;
    }

    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 12 / 100; // monthly interest rate
    const N = parseInt(tenure); // months

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiValue.toFixed(2));
  };
  // Bank logo mapping
  const getBankLogo = (bankName) => {
    const logoMap = {
      'State Bank of India': 'https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg',
      'HDFC Bank': 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg',
      'ICICI Bank': 'https://upload.wikimedia.org/wikipedia/commons/1/1c/ICICI_Bank_Logo.svg',
      'Axis Bank': 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Axis_Bank_logo.svg',
      'Kotak Mahindra Bank': 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Kotak_Mahindra_Bank_logo.svg',
      'Yes Bank': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Yes_Bank_SVG_Logo.svg',
      'IndusInd Bank': 'https://upload.wikimedia.org/wikipedia/commons/4/41/IndusInd_Bank_Logo.svg',
      'Punjab National Bank': 'https://upload.wikimedia.org/wikipedia/commons/3/3b/PNB_Logo.svg',
      'Bank of Baroda': 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Bank_of_Baroda_logo.svg',
      'Canara Bank': 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Canara_Bank_logo.svg',
      'Union Bank of India': 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Union_Bank_of_India_Logo.svg',
      'Bank of India': 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Bank_of_India_Logo.svg',
      'Federal Bank': 'https://upload.wikimedia.org/wikipedia/commons/8/82/Federal_Bank_Logo.svg',
      'South Indian Bank': 'https://upload.wikimedia.org/wikipedia/commons/8/8f/South_Indian_Bank_Logo.svg',
      'RBL Bank': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/RBL_Bank_Logo.svg',
      'DCB Bank': 'https://ui-avatars.com/api/?name=DCB&background=1e40af&color=fff&size=128&bold=true',
      'Bandhan Bank': 'https://ui-avatars.com/api/?name=Bandhan&background=059669&color=fff&size=128&bold=true',
      'AU Small Finance Bank': 'https://ui-avatars.com/api/?name=AU&background=7c3aed&color=fff&size=128&bold=true',
      'Equitas Small Finance Bank': 'https://ui-avatars.com/api/?name=Equitas&background=dc2626&color=fff&size=128&bold=true',
      'Jana Small Finance Bank': 'https://ui-avatars.com/api/?name=Jana&background=ea580c&color=fff&size=128&bold=true',
      'North East Small Finance Bank': 'https://ui-avatars.com/api/?name=NESFB&background=0891b2&color=fff&size=128&bold=true',
      'Unity Small Finance Bank': 'https://ui-avatars.com/api/?name=Unity&background=be185d&color=fff&size=128&bold=true',
      'Suryoday Small Finance Bank': 'https://ui-avatars.com/api/?name=Suryoday&background=ca8a04&color=fff&size=128&bold=true'
    };
    
    return logoMap[bankName] || `https://ui-avatars.com/api/?name=${encodeURIComponent(bankName.split(' ')[0])}&background=random&color=fff&size=128&bold=true`;
  };

  const handleBack = () => {
    console.log('Back to dashboard - navigation would go here');
    // Replace with your navigation logic
    window.history.back();
  };

  // Fetch data from GitHub
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://raw.githubusercontent.com/Veer212004/Loan-data/refs/heads/main/banklist.json');
        if (!response.ok) {
          throw new Error('Failed to fetch loan data');
        }
        const data = await response.json();
        setLoanData(data);
        setFilteredData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Search and filter logic
  useEffect(() => {
    let filtered = loanData.filter(loan =>
      loan.bankName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by bank type
    if (filterBy !== 'all') {
      filtered = filtered.filter(loan => getBankType(loan.bankName) === filterBy);
    }

    // Sort data
    filtered = filtered.sort((a, b) => {
      let aVal, bVal;
      
      if (sortBy === 'interestRate') {
        aVal = parseFloat(a.eligibility.interestRate.split('%')[0].split('–')[0]);
        bVal = parseFloat(b.eligibility.interestRate.split('%')[0].split('–')[0]);
      } else if (sortBy === 'creditScore') {
        aVal = parseInt(a.eligibility.creditScore.replace('+', ''));
        bVal = parseInt(b.eligibility.creditScore.replace('+', ''));
      } else if (sortBy === 'minIncome') {
        aVal = parseInt(a.eligibility.minIncome.replace(/₹|,|\/month/g, ''));
        bVal = parseInt(b.eligibility.minIncome.replace(/₹|,|\/month/g, ''));
      } else if (sortBy === 'bankName') {
        aVal = a.bankName;
        bVal = b.bankName;
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredData(filtered);
  }, [searchTerm, loanData, sortBy, sortOrder, filterBy]);

  const getRateColor = (rate) => {
    const numRate = parseFloat(rate.split('%')[0].split('–')[0]);
    if (numRate <= 11) return 'text-emerald-600';
    if (numRate <= 13) return 'text-green-600';
    if (numRate <= 15) return 'text-blue-600';
    if (numRate <= 18) return 'text-orange-600';
    return 'text-red-600';
  };

  const getBankType = (bankName) => {
    if (bankName.includes('Small Finance')) return 'Small Finance';
    if (['Axis Bank', 'HDFC Bank', 'ICICI Bank', 'Kotak Mahindra Bank', 'IndusInd Bank', 'Yes Bank', 'Federal Bank', 'RBL Bank', 'DCB Bank', 'Bandhan Bank', 'DBS Bank', 'IDFC First Bank'].includes(bankName)) return 'Private';
    return 'Public Sector';
  };

  const getEligibilityScore = (loan) => {
    const creditScore = parseInt(loan.eligibility.creditScore.replace('+', ''));
    const minIncome = parseInt(loan.eligibility.minIncome.replace(/₹|,|\/month/g, ''));
    
    let score = 0;
    if (creditScore <= 650) score += 3;
    else if (creditScore <= 700) score += 2;
    else score += 1;
    
    if (minIncome <= 15000) score += 3;
    else if (minIncome <= 25000) score += 2;
    else score += 1;
    
    return score;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl flex items-center space-x-4">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
          <span className="text-lg font-medium text-gray-700">Loading personal loan offers...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Failed to Load Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16">
      {/* Add `pt-16` to ensure content starts below the Navbar */}
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-white/20 sticky top-0 z-10 shadow-lg reset-header">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
  <button
    onClick={handleBack}
    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm sm:text-base"
  >
    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
    Back to Dashboard
  </button>
  <div className="flex items-center space-x-4">
    <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 sm:p-4 rounded-xl shadow-lg">
      <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
    </div>
    <div>
      <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        Personal Loans
      </h1>
      <p className="text-gray-600 text-sm sm:text-lg">
        Compare personal loan offers across major banks
      </p>
    </div>
  </div>
</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Controls */}
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl mb-8 border border-white/50">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
  <div className="flex-1 relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
    <input
      type="text"
      placeholder="Search for banks offering personal loans..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base"
    />
  </div>
  <div className="flex flex-wrap gap-2 sm:gap-4">
    <select
      value={filterBy}
      onChange={(e) => setFilterBy(e.target.value)}
      className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
    >
      <option value="all">All Bank Types</option>
      <option value="Private">Private Banks</option>
      <option value="Public Sector">Public Sector</option>
      <option value="Small Finance">Small Finance Banks</option>
    </select>
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
    >
      <option value="interestRate">Sort by Interest Rate</option>
      <option value="creditScore">Sort by Credit Score</option>
      <option value="minIncome">Sort by Min Income</option>
      <option value="bankName">Sort by Bank Name</option>
    </select>
    <button
      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all flex items-center space-x-2 shadow-lg text-sm sm:text-base"
    >
      <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
      <span>{sortOrder === 'asc' ? '↑ Low to High' : '↓ High to Low'}</span>
    </button>
  </div>
</div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-lg">
            Showing <span className="font-bold text-green-600">{filteredData.length}</span> personal loan offers
          </p>
        </div>

        {/* Loan Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredData.map((loan, index) => {
            const eligibilityScore = getEligibilityScore(loan);
            const minRate = parseFloat(loan.eligibility.interestRate.split('%')[0].split('–')[0]);
            
            return (
              <div key={index} className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                
                {/* Compact Header */}
                <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={getBankLogo(loan.bankName)} 
                        alt={`${loan.bankName} logo`}
                        className="w-12 h-12 object-contain rounded-lg bg-white p-2 shadow-md border border-white group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(loan.bankName.split(' ')[0])}&background=random&color=fff&size=128&bold=true`;
                        }}
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors leading-tight">
                          {loan.bankName}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                          getBankType(loan.bankName) === 'Small Finance' ? 'bg-purple-100 text-purple-700' :
                          getBankType(loan.bankName) === 'Private' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {getBankType(loan.bankName)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {minRate <= 11 && <Award className="w-5 h-5 text-yellow-500" />}
                      <div className="flex">
                        {[...Array(Math.min(eligibilityScore, 3))].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Compact Interest Rate */}
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-xl">
                    <div className="flex items-center justify-between text-white">
                      <div className="text-sm opacity-90">Interest Rate</div>
                      <div className="text-xl font-bold">{loan.eligibility.interestRate}</div>
                    </div>
                  </div>
                </div>

                {/* Compact Body */}
                <div className="p-4">
                  {/* Grid Layout for Key Info */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <CreditCard className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                      <div className="text-xs text-gray-600">Credit Score</div>
                      <div className="text-sm font-bold text-blue-600">{loan.eligibility.creditScore}</div>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <IndianRupee className="w-4 h-4 text-green-600 mx-auto mb-1" />
                      <div className="text-xs text-gray-600">Min Income</div>
                      <div className="text-sm font-bold text-green-600">{loan.eligibility.minIncome}</div>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <Calendar className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                      <div className="text-xs text-gray-600">Tenure</div>
                      <div className="text-sm font-bold text-purple-600">{loan.eligibility.tenure}</div>
                    </div>
                    
                    <div className="bg-orange-50 p-3 rounded-lg text-center">
                      <Users className="w-4 h-4 text-orange-600 mx-auto mb-1" />
                      <div className="text-xs text-gray-600">Age Range</div>
                      <div className="text-sm font-bold text-orange-600">{loan.eligibility.minAge}–{loan.eligibility.maxAge}y</div>
                    </div>
                  </div>

                  {/* Employment & Eligibility Row */}
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl mb-4">
                    <div className="text-center flex-1">
                      <div className="text-xs text-gray-600">Employment</div>
                      <div className="text-sm font-semibold text-gray-800">{loan.eligibility.employmentType.split('/')[0]}</div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center flex-1">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle className={`w-4 h-4 ${
                          eligibilityScore >= 5 ? 'text-green-600' :
                          eligibilityScore >= 3 ? 'text-yellow-600' :
                          'text-red-600'
                        }`} />
                        <span className={`text-sm font-bold ${
                          eligibilityScore >= 5 ? 'text-green-600' :
                          eligibilityScore >= 3 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {eligibilityScore >= 5 ? 'Easy' : eligibilityScore >= 3 ? 'Moderate' : 'Strict'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <a
                    href={loan.eligibility.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 group shadow-md hover:shadow-lg text-sm font-semibold"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Apply Now</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredData.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-8xl mb-6">🏦</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No loan offers found</h3>
            <p className="text-gray-500 text-lg">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-16 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/50">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Market Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="text-4xl font-bold text-green-600 mb-2">{loanData.length}</div>
              <div className="text-gray-600 font-medium">Total Offers</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {Math.min(...loanData.map(l => parseFloat(l.eligibility.interestRate.split('%')[0].split('–')[0])))}%
              </div>
              <div className="text-gray-600 font-medium">Lowest Rate</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {loanData.filter(l => getBankType(l.bankName) === 'Small Finance').length}
              </div>
              <div className="text-gray-600 font-medium">Small Finance Banks</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {Math.round(loanData.reduce((sum, l) => sum + parseFloat(l.eligibility.interestRate.split('%')[0].split('–')[0]), 0) / loanData.length * 10) / 10}%
              </div>
              <div className="text-gray-600 font-medium">Average Rate</div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl shadow-xl border border-white/50">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">💡 Personal Loan Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h4 className="font-semibold text-gray-800">Credit Score Matters</h4>
              </div>
              <p className="text-gray-600 text-sm">Higher credit scores (750+) typically qualify for lower interest rates and better terms.</p>
            </div>
            
            <div className="bg-white/80 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <IndianRupee className="w-6 h-6 text-green-600" />
                <h4 className="font-semibold text-gray-800">Compare Rates</h4>
              </div>
              <p className="text-gray-600 text-sm">Even a 1% difference in interest rate can save thousands over the loan tenure.</p>
            </div>
            
            <div className="bg-white/80 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <Calendar className="w-6 h-6 text-purple-600" />
                <h4 className="font-semibold text-gray-800">Choose Tenure Wisely</h4>
              </div>
              <p className="text-gray-600 text-sm">Shorter tenures mean higher EMIs but lower total interest paid.</p>
            </div>
          </div>
        </div>
        
      {/* Loan Calculator Section */}
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
          <Calculator className="w-6 h-6 mr-3 text-blue-600" />
          Quick EMI Estimator
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="number"
                placeholder="5,00,000"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              placeholder="12.5"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tenure (Months)</label>
            <input
              type="number"
              placeholder="36"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={calculateEMI}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold"
            >
              Calculate EMI
            </button>
          </div>
        </div>

        {/* EMI Result */}
        {emi && (
          <div className="mt-6 text-center text-lg font-semibold text-gray-800">
            Your Estimated EMI: ₹{emi}
          </div>
        )}
      </div>

      {/* Data Source Credit */}
      <div className="mt-8 text-center text-gray-500">
        <p className="text-sm">Personal loan data updated in real-time • Compare and apply wisely</p>
        <p className="text-xs mt-2">Always read terms and conditions before applying</p>
      </div>
    </div>
    </div>
  );
};

export default PersonalLoansDashboard;