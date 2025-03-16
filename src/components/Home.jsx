import { useTranslation } from 'react-i18next';

import { 
  Box, 
  Typography, 
  Card, 
  Grid, 
  Button, 
  Container,
  useTheme,
  alpha,
  Fade,
  Zoom,
  TextField,
  IconButton,
  Link,
  Rating,
  Avatar
} from '@mui/material';
import { 
  AccountBalance as BankIcon,
  TrendingUp as GrowthIcon,
  Security as SecurityIcon,
  Chat as ChatIcon,
  Assessment as AssessmentIcon,
  Speed as SpeedIcon,
  Lightbulb as TipIcon,
  ArrowForward as ArrowIcon,
  Send as SendIcon,
  YouTube as YouTubeIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system';
import LoanTypes from './LoanTypes';
import TextToSpeech from './TextToSpeech';

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Feature = ({ icon, title, description, delay }) => {
  const theme = useTheme();
  const IconComponent = icon;
  
  return (
    <Zoom in={true} style={{ transitionDelay: delay }}>
      <Card
        sx={{
          height: '100%',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          borderRadius: '16px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 16px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
            '& .feature-icon': {
              color: theme.palette.primary.main,
              transform: 'scale(1.1)',
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            mb: 3,
          }}
        >
          <IconComponent
            className="feature-icon"
            sx={{
              fontSize: 40,
              color: theme.palette.primary.main,
              transition: 'all 0.3s ease',
            }}
          />
        </Box>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Card>
    </Zoom>
  );
};

const TestimonialCard = ({ name, role, content, rating, image, delay }) => {
  return (
    <Fade in={true} style={{ transitionDelay: delay }}>
      <Card
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={image}
            sx={{
              width: 56,
              height: 56,
              mr: 2,
              border: '2px solid',
              borderColor: 'primary.main',
            }}
          />
          <Box>
            <Typography variant="h6" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {role}
            </Typography>
          </Box>
        </Box>
        <Rating value={rating} readOnly sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary" sx={{ flex: 1 }}>
          {content}
        </Typography>
      </Card>
    </Fade>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      icon: AssessmentIcon,
      title: t('features.eligibility.title', 'Smart Loan Eligibility Check'),
      description: t('features.eligibility.description', 'Get instant assessment of your loan eligibility using our advanced AI-powered system.'),
      delay: '0ms',
    },
    {
      icon: SpeedIcon,
      title: "Quick Loan Processing",
      description: "Experience faster loan approvals with our streamlined digital application process.",
      delay: '100ms',
    },
    {
      icon: SecurityIcon,
      title: "Secure & Confidential",
      description: "Your financial information is protected with bank-grade security measures.",
      delay: '200ms',
    },
    {
      icon: TipIcon,
      title: "Expert Financial Guidance",
      description: "Access personalized financial advice and loan management tips from our AI advisor.",
      delay: '300ms',
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Small Business Owner",
      content: "The AI loan advisor helped me understand my eligibility and guided me through the entire business loan process. Highly recommended!",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=1",
      delay: '100ms',
    },
    {
      name: "Priya Sharma",
      role: "First-time Home Buyer",
      content: "Thanks to this platform, I got all the information I needed about home loans and got pre-approved within minutes!",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=2",
      delay: '200ms',
    },
    {
      name: "Arun Patel",
      role: "Education Loan Recipient",
      content: "The AI chatbot was incredibly helpful in explaining different education loan options and documentation requirements.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=3",
      delay: '300ms',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={true}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                        fontWeight: 700,
                        mb: 2,
                        animation: `${floatAnimation} 3s ease-in-out infinite`,
                      }}
                    >
                      Your Smart AI Loan Advisor
                    </Typography>
                    <TextToSpeech text="Your Smart AI Loan Advisor" />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                      variant="h5"
                      sx={{ mb: 4, opacity: 0.9 }}
                    >
                      Get instant loan eligibility checks, personalized recommendations, and expert financial guidance powered by AI
                    </Typography>
                    <TextToSpeech text="Get instant loan eligibility checks, personalized recommendations, and expert financial guidance powered by AI" />
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<ArrowIcon />}
                    onClick={() => navigate('/loan-eligibility')}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: '30px',
                      fontSize: '1.1rem',
                      animation: `${pulseAnimation} 2s ease-in-out infinite`,
                      '&:hover': {
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    Check Your Eligibility Now
                  </Button>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Fade in={true} style={{ transitionDelay: '200ms' }}>
                <Box
                  component="img"
                  src="/loan-advisor-hero.svg"
                  alt="AI Loan Advisor"
                  sx={{
                    width: '100%',
                    maxWidth: 600,
                    height: 'auto',
                    animation: `${floatAnimation} 3s ease-in-out infinite`,
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                  }}
                />
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose Our AI Loan Advisor?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Feature {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Loan Types Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Explore Our Loan Types
          </Typography>
          <LoanTypes />
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Success Stories from Our Users
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TestimonialCard {...testimonial} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom>
              Need Personal Assistance?
            </Typography>
            <Typography variant="body1" paragraph>
              Our team of financial experts is here to help you with any questions about loans, eligibility, or the application process.
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PhoneIcon />}
                sx={{ mr: 2, mb: 2 }}
              >
                Schedule a Call
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EmailIcon />}
                sx={{ mb: 2 }}
              >
                Email Support
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton color="primary" component={Link} href="#" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" component={Link} href="#" target="_blank">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" component={Link} href="#" target="_blank">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="primary" component={Link} href="#" target="_blank">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
              }}
            >
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      variant="outlined"
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="How can we help you?"
                      variant="outlined"
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<SendIcon />}
                      sx={{
                        height: 56,
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 20px rgba(21, 101, 192, 0.3)',
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;