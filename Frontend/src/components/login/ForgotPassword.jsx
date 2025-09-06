import React, { useState } from "react";
import { CreditCard, DollarSign, TrendingUp, Shield } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message || "Check your email for reset link!");
    } catch (error) {
      setMessage("Error sending reset email.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Loan-related imagery section */}
        <div className="mb-8 text-center">
          <div className="flex justify-center items-center space-x-6 mb-6">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-4 rounded-2xl shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-4 rounded-2xl shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-2xl shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-full shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Secure Loan Portal
          </h1>
          <p className="text-gray-600 text-sm">
            Your trusted financial partner
          </p>
        </div>

        {/* Main form card */}
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-2">
              Forgot Password
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your email to receive a secure reset link
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all duration-300 placeholder-gray-400 text-gray-700"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Send Reset Link</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {message && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
              <p className="text-sm text-center text-green-700 font-medium">
                {message}
              </p>
            </div>
          )}

          {/* Trust indicators */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Bank Grade Security</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>FDIC Insured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Need help? Contact our loan specialists
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;