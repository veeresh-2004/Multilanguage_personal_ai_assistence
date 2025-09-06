import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/login/Login';  // Update the import wherever you use it
import Signup from './components/login/Signup';
import LoanEligibility from './components/LoanEligibility';
import LoanApplicationGuide from './components/Loanfinder/LoanApplicationGuide';
import FinancialTips from './components/FinancialTips';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import ForgotPassword from "./components/login/ForgotPassword";
import   Profile  from "./components/login/Profile";
import Banklists from './components/dashboard/elements/Banklist';
import  Dashboard  from './components/dashboard/DashBoard';
import LoanEligibledata from './components/dashboard/elements/LoanEligibledata';
import Getknowloans from './components/dashboard/elements/Getknowloans';
import LoanReviews from './components/dashboard/elements/LoanReviews';
import Animate from './components/Lanucherdesign/Animate';


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
    return children;
  }
  return children;
};

// Wrapper to use useLocation outside Router
const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup", "/forgot-password"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    const interval = setInterval(() => {
      const iframe = document.querySelector("iframe.skiptranslate");
      if (iframe) {
        iframe.style.display = "none";
      }
      const body = document.querySelector("body");
      if (body) {
        body.style.top = "0px";
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
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
      {!shouldHideNavbar && <Navbar />}
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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />  } />
            <Route path="/banklists" element={<Banklists />  } />
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
             <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
             <Route path="/eligible-data" element={<LoanEligibledata />  } />
             <Route path="/bank-list" element={<Banklists />  } />
             <Route path="/Loan-info" element={<Getknowloans />  } />
              <Route path="/loan-reviews" element={<LoanReviews />  } />
          </Routes>
          
        </Container>
      </Box>
    </Box>
  );
};

function App() {
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate loading completion after 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Display loading animation
    return <Animate />;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
