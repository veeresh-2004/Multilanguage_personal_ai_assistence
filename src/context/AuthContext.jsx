import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext(null);

// Create the AuthProvider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // store a reset callback for external widgets (like webchat)
  const [webchatReset, setWebchatReset] = useState(null);

  useEffect(() => {
    // Check if user is logged in (e.g., check localStorage or session)
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Handle user login
  const login = (userData, token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Handle user logout
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    // reset webchat conversation if a reset function is registered
    try {
      if (webchatReset && typeof webchatReset === 'function') webchatReset();
    } catch (e) {
      // ignore errors
    }
  };

  // Update user information
  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  if (loading) {
    return null; // or a loading spinner, e.g. <Spinner />
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser, registerWebchatReset: setWebchatReset }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};