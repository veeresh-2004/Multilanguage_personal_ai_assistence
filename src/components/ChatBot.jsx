import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Fab,
  Zoom,
  CircularProgress,
  Tooltip,
  Button,
  Dialog,
  DialogContent,
  Stack,
} from '@mui/material';
import {
  Send as SendIcon,
  Chat as ChatIcon,
  Close as CloseIcon,
  Mic as MicIcon,
  Stop as StopIcon,
  VolumeUp as VolumeUpIcon,
  Image as ImageIcon,
  AutoAwesome as AutoAwesomeIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import TextToSpeech from './TextToSpeech';

const API_KEY = "8e0252b2-8d56-4478-96f2-a2782178a849";
const API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf";
const VISION_API_URL = "https://api-inference.huggingface.co/models/google/vit-base-patch16-224";

const INITIAL_MESSAGES = [
  {
    type: 'bot',
    text: "Hello! I'm your AI loan advisor. I can help with loan information, analyze documents via images, and even chat with voice. How can I assist you today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const theme = useTheme();
  const speechSynthesisRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Clean up speech synthesis on unmount
    return () => {
      if (speechSynthesisRef.current && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const generateResponse = async (userMessage, imageData = null) => {
    try {
      let prompt = `You are a helpful loan advisor assistant. Please provide accurate and helpful information about loans.`;
      
      if (imageData) {
        prompt += ` The user has uploaded an image. Based on the analysis, the image may contain: ${imageData}. `;
      }
      
      prompt += ` User question: ${userMessage}`;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 2000,
            temperature: 0.7,
            top_p: 0.95,
            do_sample: true,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from the chatbot');
      }

      const data = await response.json();
      return data[0]?.generated_text || "I apologize, but I'm having trouble understanding. Could you please rephrase your question?";
    } catch (error) {
      console.error('Error generating response:', error);
      return getFallbackResponse(userMessage, imageData);
    }
  };

  const analyzeImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(VISION_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      // Extract the top 3 predictions
      const predictions = data.slice(0, 3).map(pred => 
        `${pred.label} (${(pred.score * 100).toFixed(1)}%)`
      ).join(', ');
      
      return `This appears to be: ${predictions}`;
    } catch (error) {
      console.error('Error analyzing image:', error);
      return "A document or image that I couldn't analyze clearly";
    }
  };

  const getFallbackResponse = (userMessage, imageData = null) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (imageData) {
      return `I notice you've shared an image with your question. Based on what I can see, the document might be related to loans or financial information. To better assist you, could you tell me what specific questions you have about this document?`;
    }
    
    if (lowerMessage.includes('loan')) {
      if (lowerMessage.includes('eligibility') || lowerMessage.includes('qualify')) {
        return "To check your loan eligibility, we typically consider factors like your income, credit score, employment status, and existing debts. Would you like to know more about specific loan requirements?";
      } else if (lowerMessage.includes('interest') || lowerMessage.includes('rate')) {
        return "Our loan interest rates typically range from 8% to 15% depending on factors like credit score, loan type, and term length. Would you like to discuss specific loan options?";
      } else if (lowerMessage.includes('document')) {
        return "For most loans, you'll need: Valid ID, proof of income (pay stubs/tax returns), bank statements, and proof of address. Additional documents may be required based on loan type. Which loan are you interested in?";
      }
    }
    return "I understand you have a question about loans. Could you please provide more details about what specific information you're looking for?";
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if ((!inputMessage.trim() && !selectedImage)) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Create user message object with potential image
    const userMessageObj = { 
      type: 'user', 
      text: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    if (selectedImage) {
      userMessageObj.image = URL.createObjectURL(selectedImage);
    }
    
    // Add user message
    setMessages(prev => [...prev, userMessageObj]);
    
    // Show bot is typing
    setIsTyping(true);

    try {
      let imageAnalysis = null;
      
      // Process image if present
      if (selectedImage) {
        imageAnalysis = await analyzeImage(selectedImage);
      }
      
      // Generate bot response
      const botResponse = await generateResponse(userMessage, imageAnalysis);
      
      // Add bot response
      const botMessageObj = { 
        type: 'bot', 
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMessageObj]);
      
      // Clear the selected image
      setSelectedImage(null);
      setImagePreview(null);
      
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: getFallbackResponse(userMessage, selectedImage ? true : false),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      
      // Clear the selected image on error too
      setSelectedImage(null);
      setImagePreview(null);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleSpeechRecognition = () => {
    if (!isRecording) {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsRecording(true);
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
          setIsRecording(false);
          // Automatically send message after speech recognition
          setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100);
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
      } else {
        alert('Speech recognition is not supported in your browser');
      }
    } else {
      setIsRecording(false);
    }
  };

  const speakText = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      // Try to find a female voice
      const femaleVoice = voices.find(voice => 
        voice.name.includes('female') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Google UK English Female')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        speechSynthesisRef.current = null;
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        speechSynthesisRef.current = null;
      };
      
      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
    
    // Reset the file input value to allow selecting the same file again
    event.target.value = '';
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const openImageDialog = (imageUrl) => {
    setDialogOpen(true);
    setImagePreview(imageUrl);
  };

  return (
    <>
      <Zoom in={!isOpen}>
        <Fab
          color="primary"
          aria-label="chat"
          onClick={() => setIsOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
            bgcolor: theme.palette.primary.main,
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease-in-out',
            },
          }}
        >
          <AutoAwesomeIcon sx={{ mr: 1 }} />
          <ChatIcon />
        </Fab>
      </Zoom>

      <Paper
        sx={{
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: { xs: '90%', sm: 400 },
          height: 500,
          zIndex: 1000,
          overflow: 'hidden',
          boxShadow: theme.shadows[10],
          borderRadius: 2,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            p: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box display="flex" alignItems="center">
            <AutoAwesomeIcon sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>AI Loan Advisor</Typography>
          </Box>
          <IconButton color="inherit" onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Messages Container */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflow: 'auto',
            bgcolor: 'background.default',
            backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.05) 100%)',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: 'background.paper',
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'primary.light',
              borderRadius: '4px',
            },
          }}
        >
          {messages.map((message, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              alignItems="flex-start"
              justifyContent={message.type === 'user' ? 'flex-end' : 'flex-start'}
            >
              {message.type === 'bot' && (
              <Avatar
                sx={{
                    bgcolor: message.isError ? 'error.main' : 'primary.main'
                  }}
                >
                  AI
                </Avatar>
              )}
              
                    <Box 
                      sx={{ 
                  maxWidth: '70%',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: message.type === 'user' 
                    ? 'primary.main' 
                    : message.isError 
                      ? 'error.light'
                      : 'grey.100',
                  color: message.type === 'user' ? 'white' : 'text.primary',
                }}
              >
                <Typography variant="body1">
                  {message.text}
                </Typography>
                {message.type === 'bot' && (
                  <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <TextToSpeech text={message.text} />
                  </Box>
                )}
              </Box>

              {message.type === 'user' && (
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  U
                </Avatar>
              )}
            </Stack>
          ))}
          {isTyping && (
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar sx={{ bgcolor: 'primary.main' }}>AI</Avatar>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'grey.100' }}>
                <CircularProgress size={20} />
                </Box>
            </Stack>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Image preview area */}
        {imagePreview && !dialogOpen && (
          <Box 
            sx={{ 
              p: 1, 
              bgcolor: 'background.paper',
              borderTop: 1,
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: 1,
                  overflow: 'hidden',
                  mr: 1,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} 
                />
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Image ready to send
              </Typography>
            </Box>
            <IconButton size="small" onClick={clearImage} color="error">
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        {/* Input Area */}
        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            gap: 1,
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          
          <IconButton
            color="primary"
            onClick={() => fileInputRef.current.click()}
            disabled={isTyping || !!selectedImage}
            sx={{
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <ImageIcon />
          </IconButton>
          
          <TextField
            fullWidth
            placeholder={isRecording ? "Listening..." : "Type your message..."}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            variant="outlined"
            size="small"
            disabled={isTyping}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 6,
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <Tooltip title={isRecording ? "Stop recording" : "Start voice input"}>
                  <IconButton
                    onClick={toggleSpeechRecognition}
                    color={isRecording ? "error" : "default"}
                    disabled={isTyping}
                    sx={{
                      animation: isRecording ? 'pulse 1.5s infinite' : 'none',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.1)' },
                        '100%': { transform: 'scale(1)' },
                      },
                    }}
                  >
                    {isRecording ? <StopIcon /> : <MicIcon />}
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <IconButton 
            type="submit" 
            color="primary"
            disabled={(!inputMessage.trim() && !selectedImage) || isTyping}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s',
              '&.Mui-disabled': {
                bgcolor: theme.palette.grey[300],
                color: theme.palette.grey[500],
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>

      {/* Image Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)',
              },
            }}
            onClick={() => setDialogOpen(false)}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={imagePreview}
            alt="Enlarged view"
            style={{
              maxWidth: '100%',
              maxHeight: '80vh',
              display: 'block',
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBot;