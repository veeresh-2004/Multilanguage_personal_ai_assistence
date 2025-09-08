import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";
import { forwardRef, useImperativeHandle, useState } from "react";

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "es", name: "Spanish", nativeName: "Español" },
];

const LanguageSelector = forwardRef(({ variant = "icon" }, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useImperativeHandle(ref, () => ({
    openMenu: () => setAnchorEl(document.body), // or any element you want
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (langCode) => {
    setCurrentLanguage(langCode);
    changeLanguageWithGoogle(langCode);
    handleClose();
  };

  const changeLanguageWithGoogle = (langCode) => {
    const selectEl = document.querySelector(".goog-te-combo");
    if (selectEl) {
      selectEl.value = langCode;
      selectEl.dispatchEvent(new Event("change")); // trigger Google translate
    }
  };

  const currentLang = languages.find((lang) => lang.code === currentLanguage);

  return (
    <Box>
      {variant === "icon" ? (
        <IconButton onClick={handleClick} color="inherit" aria-label="Select language">
          <LanguageIcon />
        </IconButton>
      ) : (
        <Button
          onClick={handleClick}
          startIcon={<LanguageIcon />}
          variant="outlined"
          size="small"
        >
          {currentLang?.nativeName || "English"}
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
              justifyContent: "space-between",
              "&.Mui-selected": {
                backgroundColor: "primary.light",
                "&:hover": {
                  backgroundColor: "primary.light",
                },
              },
            }}
          >
            <span>{lang.nativeName}</span>
            <span style={{ fontSize: "0.8em", color: "text.secondary" }}>
              {lang.name !== lang.nativeName && `(${lang.name})`}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
});

export default LanguageSelector;
