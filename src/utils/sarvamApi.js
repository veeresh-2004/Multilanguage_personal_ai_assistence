const SARVAM_API_URL = "https://api.sarvam.ai/v1/tts";
const API_KEY = "82830e4a-b067-459d-a623-ea58d987212b"; // Replace with your actual Sarvam API key

export const fetchSarvamTTS = async (text, language = "en") => {
  try {
    if (!text || !API_KEY) {
      throw new Error('Missing required parameters');
    }

    // Map language codes to Sarvam's supported languages
    const languageMap = {
      'en': 'en_IN',
      'hi': 'hi_IN',
      'ta': 'ta_IN',
      'te': 'te_IN',
      'kn': 'kn_IN',
      'ml': 'ml_IN'
    };

    const mappedLanguage = languageMap[language.split('-')[0]] || 'en_IN';

    const response = await fetch(SARVAM_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: text,
        config: {
          language: mappedLanguage,
          model: "vakyansh/hi_IN",
          sample_rate: 16000,
          gender: "female"
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(',')[1];
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Sarvam API Error:", error);
    throw error;
  }
}; 