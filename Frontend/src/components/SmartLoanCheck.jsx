import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Speed as SpeedIcon,
  Psychology as AIIcon,
  Analytics as AnalyticsIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SmartLoanCheck = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SpeedIcon color="primary" />,
      title: "Instant Assessment",
      description: "Get your loan eligibility status within minutes using our advanced system"
    },
    {
      icon: <AIIcon color="primary" />,
      title: "AI-Powered Analysis",
      description: "Our AI system analyzes multiple factors to provide accurate eligibility predictions"
    },
    {
      icon: <AnalyticsIcon color="primary" />,
      title: "Comprehensive Evaluation",
      description: "We consider income, credit score, employment history, and other relevant factors"
    },
    {
      icon: <SecurityIcon color="primary" />,
      title: "Secure Process",
      description: "Your information is protected with bank-grade security measures"
    }
  ];

  const benefits = [
    "Quick and hassle-free eligibility check",
    "Personalized loan recommendations",
    "Real-time credit score assessment",
    "Multiple loan options comparison",
    "Detailed eligibility report"
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 6 }}>
        {/* Hero Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: 'primary.main',
              mb: 2
            }}
          >
            Smart Loan Eligibility Check
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
          >
            Get instant assessment of your loan eligibility using our advanced AI-powered system.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/loan-eligibility')}
            sx={{
              py: 2,
              px: 4,
              fontSize: '1.1rem',
              borderRadius: 2,
              boxShadow: '0 8px 16px rgba(33, 150, 243, 0.2)',
            }}
          >
            Check Eligibility Now
          </Button>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  }
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Benefits Section */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 2
          }}
        >
          <Typography variant="h4" sx={{ mb: 4 }}>
            Why Choose Our Smart Eligibility Check?
          </Typography>
          <List>
            {benefits.map((benefit, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary={benefit} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* CTA Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Ready to Check Your Eligibility?
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/loan-eligibility')}
            sx={{
              py: 2,
              px: 6,
              fontSize: '1.2rem',
              borderRadius: 2,
              boxShadow: '0 8px 16px rgba(33, 150, 243, 0.2)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 20px rgba(33, 150, 243, 0.3)',
              }
            }}
          >
            Start Now
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SmartLoanCheck; 