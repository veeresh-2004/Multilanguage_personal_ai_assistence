import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Dummy signup — replace with API call later
      login(formData);
      navigate("/");
    } catch {
      setError("Signup failed. Please try again.");
    }
  };

  // ✅ Google Signup Success
  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      };
      login(userData);
      navigate("/");
    } catch {
      setError("Google signup failed.");
    }
  };

  // ❌ Google Signup Error
  const handleGoogleError = () => {
    setError("Google signup was unsuccessful. Try again.");
  };

  return (
    <div>

    
    <Box
      sx={{
        minHeight: "100vh",
        background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 25%, #48dbfb 50%, #ff9ff3 75%, #54a0ff 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'float 20s ease-in-out infinite',
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-30px) rotate(120deg)' },
          '66%': { transform: 'translateY(-15px) rotate(240deg)' },
        },
        '@keyframes slideInUp': {
          '0%': { transform: 'translateY(100px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        '@keyframes pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        '@keyframes glow': {
          '0%, 100%': { boxShadow: '0 0 30px rgba(255, 107, 107, 0.6), 0 0 60px rgba(254, 202, 87, 0.4)' },
          '50%': { boxShadow: '0 0 50px rgba(255, 107, 107, 0.8), 0 0 80px rgba(254, 202, 87, 0.6)' },
        },
        '@keyframes orbit': {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        '@keyframes morphing': {
          '0%, 100%': { borderRadius: '50% 60% 40% 70%' },
          '25%': { borderRadius: '70% 40% 60% 50%' },
          '50%': { borderRadius: '40% 70% 50% 60%' },
          '75%': { borderRadius: '60% 50% 70% 40%' },
        },
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50px',
          left: '-50px',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(45deg, rgba(255, 107, 107, 0.3), rgba(254, 202, 87, 0.3))',
          borderRadius: '50%',
          animation: 'float 20s ease-in-out infinite, morphing 15s ease-in-out infinite',
          filter: 'blur(40px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(45deg, rgba(72, 219, 251, 0.4), rgba(255, 159, 243, 0.4))',
          borderRadius: '50%',
          animation: 'float 25s ease-in-out infinite reverse, morphing 20s ease-in-out infinite',
          filter: 'blur(50px)',
          animationDelay: '5s',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-100px',
          left: '30%',
          width: '250px',
          height: '250px',
          background: 'linear-gradient(45deg, rgba(84, 160, 255, 0.3), rgba(255, 107, 107, 0.3))',
          borderRadius: '50%',
          animation: 'float 18s ease-in-out infinite, morphing 12s ease-in-out infinite',
          filter: 'blur(45px)',
          animationDelay: '10s',
        }}
      />

      {/* Floating Financial Icons with Enhanced Animations */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          fontSize: '4rem',
          opacity: 0.2,
          animation: 'orbit 30s linear infinite',
          transformOrigin: 'center',
        }}
      >
        💰
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '15%',
          fontSize: '3.5rem',
          opacity: 0.15,
          animation: 'float 22s ease-in-out infinite, pulse 4s ease-in-out infinite',
          animationDelay: '3s',
        }}
      >
        💵
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          fontSize: '3rem',
          opacity: 0.18,
          animation: 'float 28s ease-in-out infinite, pulse 6s ease-in-out infinite',
          animationDelay: '6s',
        }}
      >
        📱
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          right: '10%',
          fontSize: '3.8rem',
          opacity: 0.16,
          animation: 'orbit 35s linear infinite reverse',
          animationDelay: '9s',
        }}
      >
        ₹
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          fontSize: '2.5rem',
          opacity: 0.12,
          animation: 'float 24s ease-in-out infinite, pulse 5s ease-in-out infinite',
          animationDelay: '12s',
        }}
      >
        💰
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '70%',
          right: '5%',
          fontSize: '2.8rem',
          opacity: 0.14,
          animation: 'orbit 26s linear infinite',
          animationDelay: '15s',
        }}
      >
        🤝
      </Box>

      {/* Animated Particles */}
      {[...Array(12)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: 'rgba(255,255,255,0.6)',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${15 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: '0 0 10px rgba(255,255,255,0.8)',
          }}
        />
      ))}

      <Container maxWidth="xs">
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 2,
          }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 5,
              width: "100%",
              borderRadius: 8,
              maxWidth: 450,
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.4)',
              animation: 'slideInUp 1s ease-out',
              position: 'relative',
              transition: 'all 0.4s ease',
              '&:hover': {
                animation: 'glow 3s ease-in-out infinite',
                transform: 'translateY(-8px)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: 'linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #ff6b6b)',
                borderRadius: '8px 8px 0 0',
                backgroundSize: '400% 100%',
                animation: 'shimmer 4s ease-in-out infinite',
              },
              '@keyframes shimmer': {
                '0%': { backgroundPosition: '-400% 0' },
                '100%': { backgroundPosition: '400% 0' },
              },
            }}
          >
            {/* Logo/Header Section */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  fontSize: '4rem',
                  mb: 2,
                  animation: 'pulse 3s ease-in-out infinite',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                }}
              >
                🙋🏻‍♂️
              </Box>
              <Typography 
                variant="h3" 
                align="center" 
                gutterBottom 
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 100%',
                  animation: 'rainbow-flow 4s ease-in-out infinite',
                  textShadow: '4px 4px 8px rgba(0,0,0,0.1)',
                  '@keyframes rainbow-flow': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                  },
                }}
              >
                Create Account
              </Typography>
              <Typography 
                variant="h5" 
                align="center" 
                sx={{
                  background: 'linear-gradient(45deg, #ff9ff3, #54a0ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                  mb: 1,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                FinMate
              </Typography>
              <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 2 }}>
                Join the financial revolution 🚀✨
              </Typography>
            </Box>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  animation: 'slideInUp 0.5s ease-out',
                  borderRadius: 4,
                  background: 'linear-gradient(45deg, rgba(255, 107, 107, 0.1), rgba(254, 202, 87, 0.1))',
                  border: '1px solid rgba(255, 107, 107, 0.3)',
                }}
              >
                {error}
              </Alert>
            )}

            {/* Local Signup Form */}
            <form onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                name="name"
                type="text"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleChange}
                required
                size="medium"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.8)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
                      background: 'rgba(255,255,255,0.95)',
                    },
                    '&.Mui-focused': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 35px rgba(255, 107, 107, 0.4)',
                      background: 'rgba(255,255,255,1)',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#ff6b6b',
                    fontWeight: 600,
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ff6b6b',
                    borderWidth: '2px',
                    boxShadow: '0 0 0 3px rgba(255, 107, 107, 0.1)',
                  },
                }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                required
                size="medium"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.8)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(254, 202, 87, 0.3)',
                      background: 'rgba(255,255,255,0.95)',
                    },
                    '&.Mui-focused': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 35px rgba(254, 202, 87, 0.4)',
                      background: 'rgba(255,255,255,1)',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#feca57',
                    fontWeight: 600,
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#feca57',
                    borderWidth: '2px',
                    boxShadow: '0 0 0 3px rgba(254, 202, 87, 0.1)',
                  },
                }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                required
                size="medium"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.8)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(72, 219, 251, 0.3)',
                      background: 'rgba(255,255,255,0.95)',
                    },
                    '&.Mui-focused': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 35px rgba(72, 219, 251, 0.4)',
                      background: 'rgba(255,255,255,1)',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#48dbfb',
                    fontWeight: 600,
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#48dbfb',
                    borderWidth: '2px',
                    boxShadow: '0 0 0 3px rgba(72, 219, 251, 0.1)',
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 4,
                  mb: 3,
                  borderRadius: 4,
                  background: 'linear-gradient(45deg, #ff6b6b 30%, #feca57 60%, #48dbfb 90%)',
                  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
                  textTransform: 'none',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  py: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.02)',
                    boxShadow: '0 15px 40px rgba(255, 107, 107, 0.6)',
                    '&::before': {
                      transform: 'translateX(100%)',
                    },
                  },
                  '&:active': {
                    transform: 'translateY(-2px) scale(0.98)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    transition: 'transform 0.8s ease',
                  },
                }}
              >
                Join FinMate 🚀
              </Button>
            </form>

            <Divider 
              sx={{ 
                my: 3,
                position: 'relative',
                '&::before, &::after': {
                  borderColor: 'rgba(255, 107, 107, 0.3)',
                  borderWidth: '1px',
                },
                '&::before': {
                  animation: 'shimmer 3s ease-in-out infinite',
                },
              }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  background: 'linear-gradient(45deg, #ff6b6b, #feca57)',

                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                
                  color: '#0d0a0aff',
                }}
              >
                OR
              </Typography>
            </Divider>

            {/* ✅ Google Signup */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                mb: 3,
                '& > div': {
                  borderRadius: '15px !important',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.05)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  },
                  '&:active': {
                    transform: 'translateY(-1px) scale(1.02)',
                  },
                },
              }}
            >
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
            </Box>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  style={{
                    background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.textShadow = '0 4px 15px rgba(255, 107, 107, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.textShadow = 'none';
                  }}
                >
                  Log in
                </Link>
              </Typography>
            </Box>

            {/* Additional Animated Elements */}
            <Box
              sx={{
                position: 'absolute',
                bottom: -15,
                right: -15,
                opacity: 0.1,
                fontSize: '5rem',
                animation: 'pulse 4s ease-in-out infinite',
                animationDelay: '2s',
                filter: 'blur(1px)',
              }}
            >
              📈
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: -10,
                left: -10,
                opacity: 0.08,
                fontSize: '3rem',
                animation: 'float 20s ease-in-out infinite',
                animationDelay: '5s',
              }}
            >
              💡
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
    </div>
  );
};

export default Signup;