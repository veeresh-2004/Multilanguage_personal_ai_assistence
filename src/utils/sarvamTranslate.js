const SARVAM_API_URL = "https://api.sarvam.ai/v1/translate";
const API_KEY = "82830e4a-b067-459d-a623-ea58d987212b"; // Using the same API key as TTS

export const translateText = async (text, sourceLang = "en", targetLang = "hi") => {
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
      'ml': 'ml_IN',
      'bn': 'bn_IN',
      'gu': 'gu_IN',
      'mr': 'mr_IN',
      'od': 'od_IN',
      'pa': 'pa_IN'
    };

    const mappedSourceLang = languageMap[sourceLang.split('-')[0]] || 'en_IN';
    const mappedTargetLang = languageMap[targetLang.split('-')[0]] || 'hi_IN';

    const response = await fetch(SARVAM_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: text,
        source_language: mappedSourceLang,
        target_language: mappedTargetLang,
        domain: "general"
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.translated_text;
  } catch (error) {
    console.error("Translation API Error:", error);
    throw error;
  }
}; 