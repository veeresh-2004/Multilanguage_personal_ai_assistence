const SARVAM_API_URL = "https://api.sarvam.ai/v1/tts";
const API_KEY = "82830e4a-b067-459d-a623-ea58d987212b"; // Replace with your actual Sarvam API key

export const fetchSarvamTTS = async (text, language = "hi") => {
  try {
    if (!text || !API_KEY) {
      throw new Error('Missing required parameters');
    }

    // Map language codes to Sarvam's supported languages and models
    const languageMap = {
      'en': { sarvamCode: 'en_IN', model: 'vakyansh/en_IN' },
      'hi': { sarvamCode: 'hi_IN', model: 'vakyansh/hi_IN' },
      'ta': { sarvamCode: 'ta_IN', model: 'vakyansh/ta_IN' },
      'te': { sarvamCode: 'te_IN', model: 'vakyansh/te_IN' },
      'kn': { sarvamCode: 'kn_IN', model: 'vakyansh/kn_IN' },
      'ml': { sarvamCode: 'ml_IN', model: 'vakyansh/ml_IN' }
    };

    const langKey = language.split('-')[0];
    const { sarvamCode, model } = languageMap[langKey] || languageMap['en'];

    const response = await fetch(SARVAM_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: text,
        config: {
          language: sarvamCode,
          model: model,
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