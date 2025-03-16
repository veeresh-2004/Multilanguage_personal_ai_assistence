import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button,
  Box
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const loanTypes = [
    {
      type: 'personal',
      image: '/images/personal-loan.jpg',
      description: 'Get quick access to funds for personal expenses'
    },
    {
      type: 'business',
      image: '/images/business-loan.jpg',
      description: 'Grow your business with flexible financing options'
    },
    {
      type: 'home',
      image: '/images/home-loan.jpg',
      description: 'Make your dream home a reality'
    },
    {
      type: 'education',
      image: '/images/education-loan.jpg',
      description: 'Invest in your future with education financing'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('welcome')}
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Discover the perfect loan solution for your needs with our AI-powered advisor
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={() => navigate('/loan-eligibility')}
          sx={{ mr: 2 }}
        >
          {t('eligibility')}
        </Button>
        <Button 
          variant="outlined" 
          size="large" 
          onClick={() => navigate('/financial-tips')}
        >
          {t('financialTips')}
        </Button>
      </Box>

      <Grid container spacing={4}>
        {loanTypes.map((loan) => (
          <Grid item xs={12} sm={6} md={3} key={loan.type}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  cursor: 'pointer'
                }
              }}
              onClick={() => navigate('/loan-application', { state: { loanType: loan.type } })}
            >
              <CardMedia
                component="img"
                height="140"
                image={loan.image}
                alt={t(`loanTypes.${loan.type}`)}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {t(`loanTypes.${loan.type}`)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {loan.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Need Help?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Our AI assistant is here to guide you through the loan process.
          Click the chat button in the bottom right corner to get started.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home; 