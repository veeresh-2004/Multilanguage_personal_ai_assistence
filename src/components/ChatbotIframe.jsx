import React, { useState, useEffect } from 'react';
import { Box, Fab, Slide, Paper, IconButton, CircularProgress } from '@mui/material';
import { Chat as ChatIcon, Close as CloseIcon } from '@mui/icons-material';

const ChatbotIframe = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading state when chat is opened
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      {/* Floating chat button */}
      {!isOpen && (
        <Fab
          color="primary"
          aria-label="chat"
          onClick={() => setIsOpen(true)}
          sx={{
            boxShadow: 3,
            '&:hover': {
              transform: 'scale(1.1)',
              transition: 'transform 0.2s'
            }
          }}
        >
          <ChatIcon />
        </Fab>
      )}

      {/* Chatbot iframe container */}
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Paper
          elevation={4}
          sx={{
            width: { xs: '100vw', sm: 400 },
            height: { xs: '100vh', sm: 600 },
            position: { xs: 'fixed', sm: 'static' },
            bottom: { xs: 0, sm: 'auto' },
            right: { xs: 0, sm: 'auto' },
            borderRadius: { xs: '16px 16px 0 0', sm: 2 },
            overflow: 'hidden',
            bgcolor: 'background.paper'
          }}
        >
          {/* Loading indicator */}
          {isLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                zIndex: 1
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {/* Close button */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 2,
              bgcolor: 'background.paper',
              borderRadius: '50%',
              boxShadow: 2
            }}
          >
            <IconButton
              size="small"
              onClick={() => setIsOpen(false)}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Chatbot iframe */}
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/5ES0C9iEkoEeyvo-Wnt3_"
            width="100%"
            height="100%"
            frameBorder="0"
            onLoad={handleIframeLoad}
            style={{
              border: 'none',
              borderRadius: 'inherit'
            }}
            title="Financial Advisor Chatbot"
          />
        </Paper>
      </Slide>
    </Box>
  );
};

export default ChatbotIframe; 