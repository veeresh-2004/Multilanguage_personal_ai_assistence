import React, { useState, useEffect } from "react";
import { ArrowLeft, Search, Filter, Download, Eye, DollarSign, Calendar, Hash, Users, CheckCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';




const LoanEligibledata = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetching data using async/await
  useEffect(() => {
    const fetchData = async () => {
      console.log("Starting data fetch...");
      setIsLoading(true);

      try {
        const res = await fetch("https://raw.githubusercontent.com/Veer212004/Loan-data/refs/heads/main/eligibledata.json");

        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched data:", data);
        console.log("Data length:", data?.length);
        console.log("Sample record:", data?.[0]);
        setLoans(data || []);
      } catch (err) {
        console.error("Error fetching JSON:", err);
        setLoans([]);  // Optionally set fallback data
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to get loan status distribution
  const getLoanStatusDistribution = () => {
    if (!loans || loans.length === 0) return [];
    
    const loanStatusCount = loans.reduce((acc, loan) => {
      const status = loan.Loan_Status || loan.loan_status || 'Unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(loanStatusCount).map((key) => ({
      name: key === "Y" ? "Approved" : key === "N" ? "Rejected" : key,
      value: loanStatusCount[key],
      color: key === "Y" ? "#10B981" : key === "N" ? "#EF4444" : "#6B7280"
    }));
  };

  // Function to get property area distribution
  const getPropertyAreaDistribution = () => {
    if (!loans || loans.length === 0) return [];
    
    const areaCount = loans.reduce((acc, loan) => {
      const area = loan.Property_Area || loan.property_area || 'Unknown';
      acc[area] = (acc[area] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(areaCount).map((key) => ({
      name: key,
      value: areaCount[key]
    }));
  };

  // Filter loans based on search term
  const filteredLoans = loans.filter(loan =>
    (loan.Loan_ID?.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
    (loan.ApplicantIncome?.toString().includes(searchTerm)) ||
    (loan.LoanAmount?.toString().includes(searchTerm)) ||
    (loan.Property_Area?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLoans = filteredLoans.slice(startIndex, startIndex + itemsPerPage);

  const loanStatusData = getLoanStatusDistribution();
  const propertyAreaData = getPropertyAreaDistribution();

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleBack = () => {
    console.log('Navigating back to dashboard');
    navigate("/dashboard");
   
  };

  if (isLoading) {
    return (
      <div className="border-gray-200 rounded-xl shadow-md p-6">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading loan eligible data...</p>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300 mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Loan Eligible Data</h1>
              <p className="text-gray-600">
                Comprehensive analysis of loan eligibility and application data
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                Total Records: <span className="font-semibold text-gray-700">{loans.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Applications</p>
                <p className="text-2xl font-bold text-gray-800">{loans.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Hash className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Approved Loans</p>
                <p className="text-2xl font-bold text-green-600">
                  {loans.filter(loan => loan.Loan_Status === 'Y').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Rejected Loans</p>
                <p className="text-2xl font-bold text-red-600">
                  {loans.filter(loan => loan.Loan_Status === 'N').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Approval Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {loans.length > 0 ? Math.round((loans.filter(loan => loan.Loan_Status === 'Y').length / loans.length) * 100) : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Loan Status Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Loan Status Distribution</h3>
            {loanStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={loanStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {loanStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-500">
                No data available for chart
              </div>
            )}
          </div>

          {/* Property Area Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Property Area Distribution</h3>
            {propertyAreaData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={propertyAreaData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {propertyAreaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 137.508}, 70%, 50%)`} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-500">
                No data available for chart
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by Loan ID, Income, Amount, or Area..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Loan ID
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Applicant Income
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Coapplicant Income
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Loan Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Loan Term
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Credit History
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Property Area
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedLoans.map((loan, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        {loan.Loan_ID || loan.loan_id || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {loan.ApplicantIncome ? formatCurrency(loan.ApplicantIncome) : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {loan.CoapplicantIncome ? formatCurrency(loan.CoapplicantIncome) : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {loan.LoanAmount ? formatCurrency(loan.LoanAmount) : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {loan.Loan_Amount_Term ? `${loan.Loan_Amount_Term} months` : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        loan.Credit_History === 1 || loan.Credit_History === '1' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {loan.Credit_History === 1 || loan.Credit_History === '1' ? 'Good' : 'Poor'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {loan.Property_Area || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        loan.Loan_Status === 'Y' 
                          ? 'bg-green-100 text-green-800' 
                          : loan.Loan_Status === 'N'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {loan.Loan_Status === 'Y' ? 'Approved' : loan.Loan_Status === 'N' ? 'Rejected' : 'Unknown'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLoans.length)} of {filteredLoans.length} results
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {loans.length === 0 && !isLoading && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No loan data found</h3>
            <p className="text-gray-600">
              Unable to fetch data from the source. Please check the data source or try again later.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Retry
            </button>
          </div>
        )}

        {/* Debug Information */}
        {loans.length === 0 && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Debug Information:</h4>
            <p className="text-sm text-yellow-700">
              Trying to fetch from: Historical Data 
            </p>
            <p className="text-sm text-yellow-700">
              Check browser console for detailed error information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanEligibledata;
