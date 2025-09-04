import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// ✅ Google imports
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email: formData.email,
        name: 'User Name',
      };
      login(userData);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  // ✅ Actual Google login handler
  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential); // ✅ FIXED
      const userData = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      };
      login(userData);
      navigate('/');
    } catch (err) {
      setError('Google login failed');
    }
  };

  const handleGoogleFailure = () => {
    setError('Google login was unsuccessful. Try again.');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        position: 'relative',
        overflow: 'hidden',
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
          '0%, 100%': { boxShadow: '0 0 30px rgba(102, 126, 234, 0.6), 0 0 60px rgba(118, 75, 162, 0.4)' },
          '50%': { boxShadow: '0 0 50px rgba(102, 126, 234, 0.8), 0 0 80px rgba(118, 75, 162, 0.6)' },
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
          background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))',
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
          background: 'linear-gradient(45deg, rgba(240, 147, 251, 0.4), rgba(245, 87, 108, 0.4))',
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
          background: 'linear-gradient(45deg, rgba(79, 172, 254, 0.3), rgba(102, 126, 234, 0.3))',
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
        🏦
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
        📊
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
        💳
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
        💎
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
        🎯
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
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 2,
          }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 5,
              width: '100%',
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
                background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #667eea)',
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
                🏦
              </Box>
              <Typography 
                variant="h3" 
                align="center" 
                gutterBottom 
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
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
                Welcome Back
              </Typography>
              <Typography 
                variant="h5" 
                align="center" 
                sx={{
                  background: 'linear-gradient(45deg, #f5576c, #f093fb)',
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
                Your trusted financial companion 💼✨
              </Typography>
            </Box>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  animation: 'slideInUp 0.5s ease-out',
                  borderRadius: 4,
                  background: 'linear-gradient(45deg, rgba(245, 87, 108, 0.1), rgba(240, 147, 251, 0.1))',
                  border: '1px solid rgba(245, 87, 108, 0.3)',
                }}
              >
                {error}
              </Alert>
            )}

            {/* Email & Password Form */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                size="medium"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.8)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                      background: 'rgba(255,255,255,0.95)',
                    },
                    '&.Mui-focused': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                      background: 'rgba(255,255,255,1)',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                    fontWeight: 600,
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#667eea',
                    borderWidth: '2px',
                    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                size="medium"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.8)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(118, 75, 162, 0.3)',
                      background: 'rgba(255,255,255,0.95)',
                    },
                    '&.Mui-focused': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 35px rgba(118, 75, 162, 0.4)',
                      background: 'rgba(255,255,255,1)',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#764ba2',
                    fontWeight: 600,
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#764ba2',
                    borderWidth: '2px',
                    boxShadow: '0 0 0 3px rgba(118, 75, 162, 0.1)',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.2) rotate(15deg)',
                            color: '#667eea',
                            background: 'rgba(102, 126, 234, 0.1)',
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button 
                fullWidth 
                type="submit" 
                variant="contained" 
                size="large" 
                sx={{ 
                  mt: 4, 
                  mb: 3,
                  borderRadius: 4,
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                  textTransform: 'none',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  py: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.02)',
                    boxShadow: '0 15px 40px rgba(102, 126, 234, 0.6)',
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
                Sign In to FinMate 🚀
              </Button>
            </form>

            <Divider 
              sx={{ 
                my: 3,
                position: 'relative',
                '&::before, &::after': {
                  borderColor: 'rgba(102, 126, 234, 0.3)',
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
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.9)',
                  color: '#667eea',
                }}
              >
                OR
              </Typography>
            </Divider>

            {/* ✅ Google Login Button */}
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
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </Box>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Don't have an account?{' '}
                <MuiLink 
                  component={Link} 
                  to="/signup" 
                  sx={{
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      '&::after': {
                        width: '100%',
                        height: '3px',
                      },
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-3px',
                      left: 0,
                      width: 0,
                      height: '2px',
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      transition: 'all 0.4s ease',
                      borderRadius: '2px',
                    },
                  }}
                >
                  Sign up
                </MuiLink>
              </Typography>
              <MuiLink
                component={Link}
                to="/forgot-password"
                sx={{
                  display: 'inline-block',
                  background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px) scale(1.05)',
                    '&::after': {
                      width: '100%',
                      height: '2px',
                    },
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    width: 0,
                    height: '1px',
                    background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                    transition: 'all 0.4s ease',
                    borderRadius: '1px',
                  },
                }}
              >
                Forgot Password? 🔐
              </MuiLink>
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
  );
};

export default Login;