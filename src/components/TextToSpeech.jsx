//this is used for the text to speech
import React, { useState, useEffect } from 'react';
import { IconButton, CircularProgress, Tooltip, Snackbar, Alert } from '@mui/material';
import { VolumeUp as VolumeUpIcon, VolumeOff as VolumeOffIcon } from '@mui/icons-material';
import { fetchSarvamTTS } from '../utils/sarvamApi';

const TextToSpeech = ({ text, language = "en" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(null);
  const [showError, setShowError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [audio]);

  const handleFallbackSpeech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => {
        setError('Speech synthesis failed');
        setIsPlaying(false);
        setShowError(true);
      };
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    } else {
      setError('Text-to-speech not supported in your browser');
      setShowError(true);
    }
  };

  const handlePlay = async () => {
    try {
      if (isPlaying) {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        } else {
          window.speechSynthesis.cancel();
        }
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setShowError(false);

      if (useFallback) {
        handleFallbackSpeech();
        setIsLoading(false);
        return;
      }

      const audioData = await fetchSarvamTTS(text, language);
      if (!audioData) {
        throw new Error('No audio data received');
      }

      const audioSrc = `data:audio/wav;base64,${audioData}`;
      const newAudio = new Audio(audioSrc);
      
      newAudio.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      
      newAudio.addEventListener('error', () => {
        console.log('Audio playback failed, switching to fallback');
        setUseFallback(true);
        handleFallbackSpeech();
      });

      setAudio(newAudio);
      await newAudio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
      if (!useFallback) {
        console.log('API failed, switching to fallback');
        setUseFallback(true);
        handleFallbackSpeech();
      } else {
        setError(error.message || 'Error playing audio');
        setShowError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <>
      <Tooltip title={isPlaying ? 'Stop' : (error || 'Listen')}>
        <span>
          <IconButton 
            onClick={handlePlay} 
            disabled={isLoading}
            color={error ? "error" : "primary"}
            size="small"
          >
            {isLoading ? (
              <CircularProgress size={20} />
            ) : isPlaying ? (
              <VolumeOffIcon />
            ) : (
              <VolumeUpIcon />
            )}
          </IconButton>
        </span>
      </Tooltip>

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
    </>
  );
};

export default TextToSpeech; 