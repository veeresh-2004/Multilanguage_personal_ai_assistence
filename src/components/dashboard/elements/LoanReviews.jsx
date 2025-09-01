import React, { useState, useEffect } from 'react';
import { Star, Filter, Building, DollarSign, MapPin, Calendar, TrendingUp } from 'lucide-react';

const LoanReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filters, setFilters] = useState({ loanType: '', rating: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Veer212004/Loan-data/refs/heads/main/bankloan_reviews');
        const data = await response.json();
        setReviews(data);
        setFilteredReviews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching loan reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    let filtered = [...reviews];

    if (filters.loanType) {
      filtered = filtered.filter(review => review.loan_type.toLowerCase() === filters.loanType.toLowerCase());
    }

    if (filters.rating) {
      filtered = filtered.filter(review =>
        review.customer_reviews.some(
          customerReview => customerReview.rating.toString() === filters.rating
        )
      );
    }

    setFilteredReviews(filtered);
  }, [filters, reviews]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getLoanTypeColor = (loanType) => {
    switch (loanType) {
      case 'Personal Loan': return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'Home Loan': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'Vehicle Loan': return 'bg-purple-100 text-purple-700 border border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 mx-auto absolute top-0"></div>
          </div>
          <p className="mt-6 text-gray-700 text-xl font-medium">Loading loan reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Header */}
      <div className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-10 h-10 text-white" />
              <h1 className="text-5xl font-bold text-white">
                Loan Reviews & Ratings
              </h1>
            </div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Discover real customer experiences and make informed financial decisions with confidence
            </p>
            <div className="mt-8 flex items-center justify-center gap-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold">{reviews.length}+</div>
                <div className="text-sm">Banks Reviewed</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {reviews.reduce((acc, review) => acc + review.customer_reviews.length, 0)}+
                </div>
                <div className="text-sm">Customer Reviews</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">Trusted</div>
                <div className="text-sm">Platform</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Advanced Filters */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Filter className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Filter Reviews</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Loan Type
              </label>
              <div className="relative">
                <select 
                  name="loanType" 
                  value={filters.loanType} 
                  onChange={handleFilterChange}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gradient-to-r from-gray-50 to-white appearance-none cursor-pointer"
                >
                  <option value="">🏦 All Loan Types</option>
                  <option value="Personal Loan">👤 Personal Loan</option>
                  <option value="Home Loan">🏠 Home Loan</option>
                  <option value="Vehicle Loan">🚗 Vehicle Loan</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Minimum Rating
              </label>
              <div className="relative">
                <select 
                  name="rating" 
                  value={filters.rating} 
                  onChange={handleFilterChange}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gradient-to-r from-gray-50 to-white appearance-none cursor-pointer"
                >
                  <option value="">⭐ All Ratings</option>
                  <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                  <option value="4">⭐⭐⭐⭐ 4+ Stars</option>
                  <option value="3">⭐⭐⭐ 3+ Stars</option>
                  <option value="2">⭐⭐ 2+ Stars</option>
                  <option value="1">⭐ 1+ Stars</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{filteredReviews.length}</div>
                <div className="text-sm text-gray-600 font-medium">Filtered Results</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600">
                  {filteredReviews.reduce((acc, review) => acc + review.customer_reviews.length, 0)}
                </div>
                <div className="text-sm text-gray-600 font-medium">Total Reviews</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                <div className="text-2xl font-bold text-amber-600">
                  {filteredReviews.length > 0 ? (
                    (filteredReviews.reduce((acc, review) => 
                      acc + review.customer_reviews.reduce((sum, cr) => sum + cr.rating, 0), 0) / 
                      filteredReviews.reduce((acc, review) => acc + review.customer_reviews.length, 0)
                    ).toFixed(1)
                  ) : '0.0'}
                </div>
                <div className="text-sm text-gray-600 font-medium">Avg Rating</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">
                  {new Set(filteredReviews.map(r => r.bank)).size}
                </div>
                <div className="text-sm text-gray-600 font-medium">Banks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="space-y-8">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden">
                {/* Review Header */}
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Building className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold mb-2">{review.bank}</h3>
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getLoanTypeColor(review.loan_type)}`}>
                          {review.loan_type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                      <DollarSign className="w-6 h-6 text-white" />
                      <span className="text-2xl font-bold">{review.loan_amount}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Reviews */}
                <div className="p-8">
                  <div className="space-y-8">
                    {review.customer_reviews.map((customerReview, idx) => (
                      <div key={idx} className={`${idx > 0 ? 'border-t border-gray-100 pt-8' : ''}`}>
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                {customerReview.reviewer_name.charAt(0)}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800 text-xl mb-1">
                                {customerReview.reviewer_name}
                              </h4>
                              <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <MapPin className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">{customerReview.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-500">
                                <Calendar className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm">
                                  {new Date(customerReview.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-start lg:items-end gap-3">
                            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-xl border border-yellow-200">
                              {renderStars(customerReview.rating)}
                              <span className="ml-2 font-bold text-gray-700">{customerReview.rating}.0</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 rounded-2xl p-6 border border-gray-100 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100/50 rounded-full -translate-y-10 translate-x-10"></div>
                          <div className="relative z-10">
                            <div className="flex items-start gap-3">
                              <div className="w-1 h-full bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full mt-1"></div>
                              <blockquote className="text-gray-800 leading-relaxed text-lg italic">
                                "{customerReview.review}"
                              </blockquote>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-16 max-w-lg mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Filter className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Reviews Found</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  No reviews match your current filter selection. Try adjusting your filters to explore more options.
                </p>
                <button 
                  onClick={() => setFilters({ loanType: '', rating: '' })}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Summary Statistics */}
        {filteredReviews.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Review Analytics</h3>
              <p className="text-gray-600">Comprehensive overview of filtered results</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center border border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {filteredReviews.length}
                </div>
                <div className="text-sm text-gray-700 font-medium">Loan Products</div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 text-center border border-emerald-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white fill-current" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-1">
                  {filteredReviews.reduce((acc, review) => acc + review.customer_reviews.length, 0)}
                </div>
                <div className="text-sm text-gray-700 font-medium">Customer Reviews</div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 text-center border border-amber-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-amber-600 mb-1">
                  {(filteredReviews.reduce((acc, review) => 
                    acc + review.customer_reviews.reduce((sum, cr) => sum + cr.rating, 0), 0) / 
                    filteredReviews.reduce((acc, review) => acc + review.customer_reviews.length, 0) || 0
                  ).toFixed(1)}
                </div>
                <div className="text-sm text-gray-700 font-medium">Average Rating</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center border border-purple-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {new Set(filteredReviews.map(r => r.bank)).size}
                </div>
                <div className="text-sm text-gray-700 font-medium">Banks Featured</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanReviews;