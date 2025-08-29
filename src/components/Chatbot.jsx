import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Inject Botpress scripts dynamically
    const injectScript = (src) => {
      const script = document.createElement("script");
      script.src = src;
      script.defer = true;
      document.body.appendChild(script);
    };

    injectScript("https://cdn.botpress.cloud/webchat/v3.2/inject.js");
    injectScript("https://files.bpcontent.cloud/2025/07/23/10/20250723105209-4XHND2XE.js");

    return () => {
      // Cleanup if component unmounts
      const scripts = document.querySelectorAll(
        'script[src*="botpress"], script[src*="bpcontent"]'
      );
      scripts.forEach((s) => s.remove());
    };
  }, []);

  return null; // Nothing visible in JSX, chatbot renders itself
};

export default Chatbot;
