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
          elevation={3}
          sx={{ p: 3, width: "100%", borderRadius: 5, maxWidth: 400 }}
        >
          <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
            Create Your Account
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Join FinMate today
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
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
              size="small"
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
              size="small"
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
              size="small"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 1 }}
            >
              Sign Up
            </Button>
          </form>

          {/* Divider */}
          <Divider sx={{ my: 2 }}>OR</Divider>

          {/* ✅ Google Signup */}
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
                Log in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;
