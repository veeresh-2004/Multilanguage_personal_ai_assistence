import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Button,
  Snackbar,
  Alert,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import {
  AccountBalance as BudgetIcon,
  Savings as SavingsIcon,
  TrendingUp as InvestingIcon,
  Assessment as CreditScoreIcon,
  PictureAsPdf as PdfIcon,
  Chat as ChatIcon,
  RecordVoiceOver as VoiceIcon,
  SmartToy as AiIcon,
  Translate as TranslateIcon,
  Send as SendIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const FinancialTips = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState(null);
  const [showFeatureNotAvailable, setShowFeatureNotAvailable] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleFeatureClick = (feature) => {
  if (feature.path) {
    navigate(feature.path);
  }
};


  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory([
        ...chatHistory,
        { type: 'user', message: chatMessage },
        { type: 'bot', message: 'Thank you for your message. Our AI assistant will respond shortly.' }
      ]);
      setChatMessage('');
    }
  };

  const aiFeatures = [
    {
      icon: <ChatIcon fontSize="large" />,
      title: "AI Chat Assistant",
      description: "Get instant answers to your financial questions",
      key: 'chat'
    },
    {
      icon: <VoiceIcon fontSize="large" />,
      title: "Voice Guidance",
      description: "Listen to financial advice and tips",
      key: 'voice'
    },
    {
      icon: <AiIcon fontSize="large" />,
      title: "Smart Advisor",
      description: "Personalized financial recommendations",
      key: 'advisor',
      path: '/banklists'

    },
    {
      icon: <TranslateIcon fontSize="large" />,
      title: "Multi-Language",
      description: "Access resources in your preferred language",
      key: 'language'
    }
  ];

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const tabLabels = {
    budgeting: 'Budget Planning',
    saving: 'Smart Savings',
    investing: 'Investment Tips',
    creditScore: 'Credit Score',
  };

  // Ensure PDFs are in "public/pdfs/" folder
  const pdfResources = {
    budgeting: '/pdfs/budget.pdf',
    saving: '/pdfs/savings.pdf',
    investing: '/pdfs/investment.pdf',
    creditScore: '/pdfs/credit.pdf',
  };

  // Corrected function to handle PDF download & preview
  const handleDownload = async (pdfUrl) => {
    try {
      console.log('Fetching PDF from:', pdfUrl);

      const response = await fetch(pdfUrl, { method: 'GET' });
      if (!response.ok) {
        throw new Error(`PDF not found (${response.status})`);
      }

      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error('PDF file is empty');
      }

      // Create a temporary object URL & open it
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank'); // Open in a new tab instead of forcing a download

      // Delay cleanup to prevent premature revocation
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 10000); // 10 seconds delay

    } catch (error) {
      console.error('Download error:', error);
      setError(`Unable to load the PDF. Please try again.`);
      setTimeout(() => setError(null), 5000);
    }
  };

  const tips = {
    budgeting: [
      'Create a monthly budget and track all expenses',
      'Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings',
      'Track and categorize all expenses',
      'Look for areas to reduce unnecessary spending',
      'Set specific financial goals',
    ],
    saving: [
      'Build an emergency fund covering 3-6 months of expenses',
      'Set up automatic savings transfers',
      'Look for high-yield savings accounts',
      'Save windfalls like tax refunds or bonuses',
      'Review and reduce recurring subscriptions',
    ],
    investing: [
      'Start investing early to benefit from compound interest',
      'Diversify your investment portfolio',
      'Consider low-cost index funds for long-term growth',
      'Research before making investment decisions',
      'Regularly review and rebalance your portfolio',
    ],
    creditScore: [
      'Pay all bills on time',
      'Keep credit utilization below 30%',
      'Regularly check your credit report',
      'Avoid applying for too many new credit accounts',
      'Keep old credit accounts open to maintain credit history',
    ],
  };

  const getCurrentCategory = () => {
    switch (activeTab) {
      case 0: return 'budgeting';
      case 1: return 'saving';
      case 2: return 'investing';
      case 3: return 'creditScore';
      default: return 'budgeting';
    }
  };

  const renderTipsList = () => {
    const currentCategory = getCurrentCategory();
    return (
      <Box>
        <List>
          {tips[currentCategory].map((tip, index) => (
            <Fade in={true} style={{ transitionDelay: `${index * 100}ms` }} key={index}>
              <ListItem
                sx={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    transform: 'translateX(8px)',
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                  },
                }}
              >
                <ListItemIcon>
                  {activeTab === 0 && <BudgetIcon color="primary" />}
                  {activeTab === 1 && <SavingsIcon color="primary" />}
                  {activeTab === 2 && <InvestingIcon color="primary" />}
                  {activeTab === 3 && <CreditScoreIcon color="primary" />}
                </ListItemIcon>
                <ListItemText primary={tip} />
              </ListItem>
            </Fade>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PdfIcon />}
          onClick={() => handleDownload(pdfResources[currentCategory])}
          sx={{ mt: 2 }}
        >
          {t('Download Guide')}
        </Button>
      </Box>
    );
  };

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
            mb: 3
          }}
        >
          Financial Resource Center
        </Typography>

        <Grid container spacing={3}>
          {/* Left Sidebar with AI Features */}
          <Grid item xs={12} md={3}>
            <Box sx={{ 
              position: { md: 'sticky' }, 
              top: 24,
              height: { md: 'calc(100vh - 100px)' },
              overflowY: 'auto'
            }}>
              {aiFeatures.map((feature, index) => (
                <Paper
                  key={index}
                  onClick={() => handleFeatureClick(feature)} 
                  sx={{
                    p: 3,
                    mb: 2,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                      bgcolor: 'primary.main',
                      '& .MuiSvgIcon-root': { 
                        color: 'white',
                        transform: 'scale(1.1)',
                      },
                      '& .MuiTypography-root': { 
                        color: 'white' 
                      },
                      '& .feature-description': {
                        color: 'rgba(255, 255, 255, 0.9)'
                      }
                    },
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    '& .MuiSvgIcon-root': {
                      transition: 'transform 0.3s ease',
                      fontSize: '2.5rem'
                    }
                  }}>
                    <Box sx={{ color: 'primary.main', mr: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      transition: 'color 0.3s ease'
                    }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    className="feature-description"
                    sx={{ 
                      color: 'text.secondary',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    mb: 3,
                    borderBottom: 1,
                    borderColor: 'divider',
                    '& .MuiTab-root': {
                      minWidth: 120,
                      transition: 'all 0.3s ease',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      textTransform: 'none',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateY(-2px)',
                      },
                      '&.Mui-selected': {
                        fontWeight: 600,
                      },
                    },
                  }}
                >
                  <Tab 
                    icon={<BudgetIcon />} 
                    label={tabLabels.budgeting}
                    sx={{ minHeight: 64 }}
                  />
                  <Tab 
                    icon={<SavingsIcon />} 
                    label={tabLabels.saving}
                    sx={{ minHeight: 64 }}
                  />
                  <Tab 
                    icon={<InvestingIcon />} 
                    label={tabLabels.investing}
                    sx={{ minHeight: 64 }}
                  />
                  <Tab 
                    icon={<CreditScoreIcon />} 
                    label={tabLabels.creditScore}
                    sx={{ minHeight: 64 }}
                  />
                </Tabs>

                <Box sx={{ mt: 2 }}>
                  {renderTipsList()}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Chat Dialog */}
      <Dialog
        open={showChat}
        onClose={() => setShowChat(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: 'primary.main',
          color: 'white'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ChatIcon sx={{ mr: 1 }} />
            AI Chat Assistant
          </Box>
          <IconButton onClick={() => setShowChat(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          p: 2,
          bgcolor: '#f5f5f5'
        }}>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
            {chatHistory.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  mb: 1
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: '70%',
                    bgcolor: msg.type === 'user' ? 'primary.main' : 'white',
                    color: msg.type === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="body1">
                    {msg.message}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              startIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showFeatureNotAvailable}
        onClose={() => setShowFeatureNotAvailable(false)}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Coming Soon!
          </Typography>
          <Typography variant="body1">
            This feature is currently under development and will be available soon.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowFeatureNotAvailable(false)}
            sx={{ mt: 2 }}
          >
            Got it
          </Button>
        </Box>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setError(null)} 
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FinancialTips;
