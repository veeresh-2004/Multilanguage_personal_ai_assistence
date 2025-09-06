import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  LinearProgress,
  Fade,
  Grow,
  Zoom,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  AccountBalance as BankIcon,
  Description as DocumentIcon,
  Assessment as CreditIcon,
  AttachMoney as MoneyIcon,
  Work as JobIcon,
  Home as PropertyIcon,
  CheckCircle as ApprovedIcon,
  Timeline as TimelineIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';

const Eligibility = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const eligibilitySteps = [
    {
      icon: <BankIcon sx={{ fontSize: '3rem' }} />,
      title: 'Bank Account',
      description: 'Active bank account with minimum 6 months history',
      requirements: ['Regular transactions', 'Minimum balance maintenance', 'No overdrafts'],
      color: '#2196f3'
    },
    {
      icon: <JobIcon sx={{ fontSize: '3rem' }} />,
      title: 'Employment',
      description: 'Stable employment or business income',
      requirements: ['Minimum 2 years experience', 'Regular salary credits', 'Employment verification'],
      color: '#4caf50'
    },
    {
      icon: <CreditIcon sx={{ fontSize: '3rem' }} />,
      title: 'Credit Score',
      description: 'Good credit history and score',
      requirements: ['Credit score above 700', 'No defaults', 'Clean credit history'],
      color: '#f44336'
    },
    {
      icon: <MoneyIcon sx={{ fontSize: '3rem' }} />,
      title: 'Income',
      description: 'Sufficient monthly income',
      requirements: ['Debt-to-Income ratio < 50%', 'Stable income source', 'Additional income proofs'],
      color: '#ff9800'
    },
    {
      icon: <DocumentIcon sx={{ fontSize: '3rem' }} />,
      title: 'Documents',
      description: 'Required documentation',
      requirements: ['ID proof', 'Address proof', 'Income documents'],
      color: '#9c27b0'
    },
    {
      icon: <PropertyIcon sx={{ fontSize: '3rem' }} />,
      title: 'Property',
      description: 'Property evaluation',
      requirements: ['Legal clearance', 'Valuation report', 'Property insurance'],
      color: '#795548'
    }
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 600,
            color: 'primary.main',
            mb: 4
          }}
        >
          Loan Eligibility Criteria
        </Typography>

        <Box sx={{ mb: 4 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(0,0,0,0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                backgroundImage: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
              }
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {eligibilitySteps.map((step, index) => (
            <Grow
              key={index}
              in={true}
              style={{ transformOrigin: '0 0 0' }}
              timeout={1000 + index * 200}
            >
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                      '& .step-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                      }
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      backgroundColor: step.color,
                    }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mb: 2 
                  }}>
                    <Box
                      className="step-icon"
                      sx={{
                        color: step.color,
                        transition: 'transform 0.3s ease',
                        mr: 2
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {step.title}
                    </Typography>
                  </Box>

                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {step.description}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    {step.requirements.map((req, reqIndex) => (
                      <Fade
                        key={reqIndex}
                        in={true}
                        style={{ transitionDelay: `${reqIndex * 200}ms` }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            '&:last-child': { mb: 0 }
                          }}
                        >
                          <ArrowIcon 
                            sx={{ 
                              fontSize: '0.8rem', 
                              mr: 1,
                              color: step.color
                            }} 
                          />
                          <Typography variant="body2">
                            {req}
                          </Typography>
                        </Box>
                      </Fade>
                    ))}
                  </Box>

                  {index < eligibilitySteps.length - 1 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: -20,
                        right: -20,
                        color: 'rgba(0,0,0,0.05)',
                        transform: 'rotate(-45deg)',
                      }}
                    >
                      <TimelineIcon sx={{ fontSize: '8rem' }} />
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grow>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Zoom in={progress === 100}>
            <Paper
              sx={{
                p: 3,
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: 2,
                bgcolor: '#4caf50',
                color: 'white',
              }}
            >
              <ApprovedIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                Meet these criteria to qualify for the loan!
              </Typography>
            </Paper>
          </Zoom>
        </Box>
      </Box>
    </Container>
  );
};

export default Eligibility; 