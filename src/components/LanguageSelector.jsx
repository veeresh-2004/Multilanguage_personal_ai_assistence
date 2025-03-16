import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' }
];

const LanguageSelector = ({ variant = 'icon' }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentLanguage, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    handleClose();
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <Box>
      {variant === 'icon' ? (
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label={t('selectLanguage')}
        >
          <LanguageIcon />
        </IconButton>
      ) : (
        <Button
          onClick={handleClick}
          startIcon={<LanguageIcon />}
          variant="outlined"
          size="small"
        >
          {currentLang?.nativeName || 'English'}
        </Button>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            maxHeight: 300,
            mt: 1,
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            selected={currentLanguage === lang.code}
            sx={{
              minWidth: 150,
              justifyContent: 'space-between',
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}
          >
            <span>{lang.nativeName}</span>
            <span style={{ fontSize: '0.8em', color: 'text.secondary' }}>
              {lang.name !== lang.nativeName && `(${lang.name})`}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSelector; 