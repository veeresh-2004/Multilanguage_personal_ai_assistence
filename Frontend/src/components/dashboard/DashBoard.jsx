import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Database, CheckCircle, FileText, BarChart3 } from 'lucide-react';
import { ArrowBackIosNewSharp } from '@mui/icons-material';

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate(); // Add useNavigate hook

  const cards = [
    {
      title: "Bank-details",
      description: "View comprehensive loan information,  Bank , their Interest Rate applications, and historical data records.",
      icon: <Database className="w-8 h-8" />,
      path: "/bank-list",
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "from-blue-600 to-blue-700"
    },
    {
      title: "Eligible Data",
      description: "Check loan eligibility criteria and qualification parameters for applicants based on the data provided.",
      icon: <CheckCircle className="w-8 h-8" />,
      path: "/eligible-data",
      gradient: "from-green-500 to-green-600",
      hoverGradient: "from-green-600 to-green-700"
    },
    {
      title: "Get Know Kinds of Loan",
      description: "You get educate about various loan products, types, and application procedures.",
      icon: <FileText className="w-8 h-8" />,
      path: "/Loan-Info",
      gradient: "from-purple-500 to-purple-600",
      hoverGradient: "from-purple-600 to-purple-700"
    },
    {
      title: "Get here Bunch of loans reviews",
      description: "Manage detailed loan analytics, reports, and performance metrics dashboard.",
      icon: <BarChart3 className="w-8 h-8" />,
      path: "/loan-reviews",
      gradient: "from-orange-500 to-orange-600",
      hoverGradient: "from-orange-600 to-orange-700"
    }
  ];

  // Updated: Navigate on card click
  const handleCardClick = (path, title) => {
    setSelectedCard({ path, title });
    navigate(path); // Navigate to the selected page
  };
 
  const handledclick=()=>{
    navigate('/bank-list');
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ArrowBackIosNewSharp className="w-6 h-6 text-gray-600 mb-4 mt-5 cursor-pointer" onClick={() => window.history.back()}/>
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Loan Management Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your loan portfolio and access key insights
          </p>
          {selectedCard && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                Last clicked: <span className="font-semibold">{selectedCard.title}</span> → {selectedCard.path}
              </p>
            </div>
          )}
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(card.path, card.title)}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Gradient Background Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-all duration-300`}></div>
              
              {/* Card Content */}
              <div className="relative p-6">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${card.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                  {card.description}
                </p>

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent group-hover:from-gray-800 group-hover:to-gray-800 transition-all duration-300`}>
                    View Details
                  </span>
                  <div className={`p-2 rounded-full bg-gradient-to-r ${card.gradient} text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gray-200 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Loans</p>
                <p className="text-2xl font-bold text-gray-800">1,247</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Approved</p>
                <p className="text-2xl font-bold text-gray-800">856</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Processing</p>
                <p className="text-2xl font-bold text-gray-800">391</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to Your Loan Management System
            </h2>
            <p className="text-indigo-100 max-w-2xl mx-auto text-lg">
              Navigate through different sections to manage loan data, check eligibility criteria, 
              and access detailed analytics. Each card provides specific functionality for your loan portfolio management.
            </p>
            <div className="mt-6">
              <button  onClick={() => navigate('/bank-list')} className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
