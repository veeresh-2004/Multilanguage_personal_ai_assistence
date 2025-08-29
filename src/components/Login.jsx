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
import { useAuth } from '../context/AuthContext';

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
          elevation={3}
          sx={{
            p: 3,
            width: '100%',
            borderRadius: 5,
            maxWidth: 400,
            maxHeight: 600,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
            Welcome Back FinMate
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to continue
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
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
              size="small"
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
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button fullWidth type="submit" variant="contained" size="medium" sx={{ mt: 2, mb: 1 }}>
              Sign In
            </Button>
          </form>

          <Divider sx={{ my: 2 }}>OR</Divider>

          {/* ✅ Google Login Button */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <MuiLink component={Link} to="/signup" color="primary">
                Sign up
              </MuiLink>
            </Typography>
            <MuiLink
              component={Link}
              to="/forgot-password"
              color="primary"
              sx={{ display: 'inline-block', mt: 1 }}
            >
              Forgot Password?
            </MuiLink>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
