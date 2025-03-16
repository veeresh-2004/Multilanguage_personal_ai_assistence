import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import LoanEligibility from './components/LoanEligibility';
import LoanApplicationGuide from './components/LoanApplicationGuide';
import FinancialTips from './components/FinancialTips';
import ChatBot from './components/ChatBot';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '8px 16px',
        },
        contained: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    // Instead of redirecting, we'll show the component with restricted functionality
    return children;
  }
  
  return children;
};

function App() {
  console.log('App rendering started');

  return (
    <ErrorBoundary>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <LanguageProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Router>
                <Box
                  sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `
                        radial-gradient(circle at 20% 30%, rgba(25, 118, 210, 0.05) 0%, transparent 25%),
                        radial-gradient(circle at 80% 70%, rgba(156, 39, 176, 0.05) 0%, transparent 25%)
                      `,
                      pointerEvents: 'none',
                    },
                  }}
                >
                  <Navbar />
                  <Box
                    component="main"
                    sx={{
                      pt: { xs: 8, sm: 10 },
                      pb: { xs: 4, sm: 6 },
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <Container maxWidth="xl">
                      <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        
                        {/* Protected routes */}
                        <Route
                          path="/loan-eligibility"
                          element={
                            <ProtectedRoute>
                              <LoanEligibility />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/loan-application"
                          element={
                            <ProtectedRoute>
                              <LoanApplicationGuide />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/financial-tips"
                          element={
                            <ProtectedRoute>
                              <FinancialTips />
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                    </Container>
                  </Box>
                  <ChatBot />
                </Box>
              </Router>
            </ThemeProvider>
          </LanguageProvider>
        </I18nextProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
