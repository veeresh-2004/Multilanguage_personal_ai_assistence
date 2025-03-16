import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Alert,
  Snackbar
} from '@mui/material';
import { Translate as TranslateIcon } from '@mui/icons-material';
import { translateText } from '../utils/sarvamTranslate';

const Translation = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'mr', name: 'Marathi' },
    { code: 'od', name: 'Odia' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' }
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      setShowError(false);
      
      const result = await translateText(inputText, sourceLang, targetLang);
      setTranslatedText(result);
    } catch (error) {
      console.error('Translation failed:', error);
      setError(error.message || 'Translation failed');
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Language Translator
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>From</InputLabel>
          <Select
            value={sourceLang}
            label="From"
            onChange={(e) => setSourceLang(e.target.value)}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>To</InputLabel>
          <Select
            value={targetLang}
            label="To"
            onChange={(e) => setTargetLang(e.target.value)}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Enter text to translate"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleTranslate}
        disabled={!inputText.trim() || isLoading}
        startIcon={isLoading ? <CircularProgress size={20} /> : <TranslateIcon />}
        sx={{ mb: 3 }}
      >
        Translate
      </Button>

      {translatedText && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Translation:
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography>{translatedText}</Typography>
          </Paper>
        </Box>
      )}

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Translation; 