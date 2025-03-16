import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
  Avatar,
  Alert,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  Send as SendIcon,
  Close as CloseIcon,
  SmartToy as BotIcon,
  Person as UserIcon,
  CompareArrows as CompareIcon,
  BarChart as ChartIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const API_KEY = '2fjo7lm0j5oojfxwf79woo3m7pjr90xx';
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Loan dataset structured for easy access
const LOAN_DATA = {
  loanTypes: ['Home Loan', 'Car Loan', 'Education Loan', 'Personal Loan', 'Business Loan'],
  banks: ['Bank A', 'Bank B', 'Bank C', 'Bank D', 'Bank E', 'Bank F', 'Bank G', 'Bank H', 'Bank I', 'Bank J'],
  interestRanges: {
    'Home Loan': { min: 5.09, max: 14.98 },
    'Car Loan': { min: 5.06, max: 14.99 },
    'Education Loan': { min: 5.13, max: 14.90 },
    'Personal Loan': { min: 5.02, max: 14.69 },
    'Business Loan': { min: 5.34, max: 14.86 }
  },
  processingFees: { min: 0.52, max: 2.99 },
  creditScoreRequirements: { min: 600, max: 798 }
};

// Loan data analysis functions
const analyzeLoanData = {
  // Find best loan offers based on criteria
  findBestOffers: (loanType, creditScore, salary) => {
    const offers = LOAN_DATABASE.filter(loan => 
      loan.Loan_Type === loanType &&
      loan.Credit_Score_Required <= creditScore &&
      parseFloat(loan.Minimum_salary.replace(/[^0-9.]/g, '')) <= salary
    );
    return offers.sort((a, b) => parseFloat(a.Interest_Rate) - parseFloat(b.Interest_Rate)).slice(0, 5);
  },

  // Compare loans across banks
  compareBankOffers: (loanType) => {
    return LOAN_DATABASE
      .filter(loan => loan.Loan_Type === loanType)
      .sort((a, b) => parseFloat(a.Interest_Rate) - parseFloat(b.Interest_Rate));
  },

  // Calculate EMI
  calculateEMI: (principal, rate, tenure) => {
    const monthlyRate = (rate / 12) / 100;
    const months = tenure * 12;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
           (Math.pow(1 + monthlyRate, months) - 1);
  },

  // Get loan statistics
  getLoanStats: (loanType) => {
    const loans = LOAN_DATABASE.filter(loan => loan.Loan_Type === loanType);
    return {
      avgRate: loans.reduce((acc, loan) => acc + parseFloat(loan.Interest_Rate), 0) / loans.length,
      minRate: Math.min(...loans.map(loan => parseFloat(loan.Interest_Rate))),
      maxRate: Math.max(...loans.map(loan => parseFloat(loan.Interest_Rate))),
      avgProcessingFee: loans.reduce((acc, loan) => acc + parseFloat(loan.Processing_Fees), 0) / loans.length,
    };
  }
};

// Enhanced system message with data analysis capabilities
const SYSTEM_MESSAGE = {
  role: 'system',
  content: `You are an advanced AI Financial Advisor with comprehensive loan analysis capabilities. Your responses should:

1. Provide data-driven advice using advanced analytics:
   - Compare loan offers across banks
   - Calculate EMIs and total costs
   - Analyze interest rate trends
   - Recommend best offers based on user criteria
   - Visualize comparisons when helpful

2. For loan analysis:
   - Use findBestOffers() for personalized recommendations
   - Use compareBankOffers() for bank comparisons
   - Use calculateEMI() for payment calculations
   - Use getLoanStats() for market insights

3. Format responses with clear sections:
   - 📊 Analysis Summary
   - 💰 Financial Details
   - ✅ Recommendations
   - ⚠️ Important Notes

4. Handle non-financial queries:
   - Politely redirect to financial topics
   - Explain the focus on financial advice
   - Suggest relevant financial questions

Stay professional, data-driven, and focused on financial advice.`
};

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: `Hello! I'm your AI Financial Advisor with access to real-time loan data from multiple banks. I can help you with:

• Comparing loan offers from ${LOAN_DATA.banks.length} different banks
• Finding the best interest rates for your loan type
• Checking eligibility criteria and required documents
• Understanding processing fees and total costs
• Recommending the most suitable loan options

What type of loan information would you like to know about? I can provide details about:
${LOAN_DATA.loanTypes.map(type => `• ${type}`).join('\n')}`
};

const ChatbotDialog = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showChatbase, setShowChatbase] = useState(false);
  const [filters, setFilters] = useState({
    loanType: '',
    maxRate: '',
    maxProcessingFee: '',
    minCreditScore: ''
  });
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
      setError(null);
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            SYSTEM_MESSAGE,
            ...messages.slice(-4),
            userMessage
          ],
          temperature: 0.7,
          max_tokens: 800, // Increased for more detailed responses
          presence_penalty: 0.6,
          frequency_penalty: 0.3,
          top_p: 0.9
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      
      if (data.choices?.[0]?.message) {
        const assistantMessage = {
          role: 'assistant',
          content: data.choices[0].message.content
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Invalid response format from AI');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('I apologize, but I encountered an error. Please try asking your question again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Function to render loan comparison table
  const renderLoanComparison = (loans) => (
    <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Bank</TableCell>
            <TableCell>Interest Rate</TableCell>
            <TableCell>Processing Fee</TableCell>
            <TableCell>Min Credit Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((loan, index) => (
            <TableRow key={index}>
              <TableCell>{loan.Bank}</TableCell>
              <TableCell>{loan.Interest_Rate}%</TableCell>
              <TableCell>{loan.Processing_Fees}%</TableCell>
              <TableCell>{loan.Credit_Score_Required}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // Function to render visualization
  const renderVisualization = (data) => (
    <Box sx={{ height: 300, mt: 2, mb: 2 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: '90vh',
          maxHeight: '800px',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <DialogTitle sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <BotIcon />
          </Avatar>
          <Typography variant="h6">AI Financial Advisor</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => setActiveTab(1)} color={activeTab === 1 ? "primary" : "default"}>
            <CompareIcon />
          </IconButton>
          <IconButton onClick={() => setActiveTab(2)} color={activeTab === 2 ? "primary" : "default"}>
            <ChartIcon />
          </IconButton>
          <IconButton onClick={() => setActiveTab(3)} color={activeTab === 3 ? "primary" : "default"}>
            <FilterIcon />
          </IconButton>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', p: 0, overflow: 'hidden' }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ px: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Chat" />
          <Tab label="Compare" />
          <Tab label="Analytics" />
          <Tab label="Filters" />
        </Tabs>

        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          {/* Main chat interface */}
          {activeTab === 0 && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
              {/* Existing chat messages */}
              <Box sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      gap: 2,
                      alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '75%'
                    }}
                  >
                    {message.role === 'assistant' && (
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main',
                          width: 36,
                          height: 36
                        }}
                      >
                        <BotIcon sx={{ fontSize: 20 }} />
                      </Avatar>
                    )}
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        backgroundColor: message.role === 'user' ? 'primary.main' : 'white',
                        color: message.role === 'user' ? 'white' : 'text.primary',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: message.role === 'user' ? 'primary.main' : 'divider',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          lineHeight: 1.6,
                          fontSize: '0.95rem',
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {message.content}
                      </Typography>
                    </Paper>
                    {message.role === 'user' && (
                      <Avatar 
                        sx={{ 
                          bgcolor: 'secondary.main',
                          width: 36,
                          height: 36
                        }}
                      >
                        <UserIcon sx={{ fontSize: 20 }} />
                      </Avatar>
                    )}
                  </Box>
                ))}
              </Box>
              
              {/* Input area */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  borderTop: 1,
                  borderColor: 'divider'
                }}
              >
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  placeholder="Ask about loans..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  variant="outlined"
                  size="small"
                />
                <IconButton
                  color="primary"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                >
                  <SendIcon />
                </IconButton>
              </Paper>
            </Box>
          )}

          {/* Chatbase iframe integration */}
          {showChatbase && (
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/5ES0C9iEkoEeyvo-Wnt3_"
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              title="Chatbase Assistant"
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog; 