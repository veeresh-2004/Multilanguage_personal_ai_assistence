import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

console.log("VITE_GOOGLE_CLIENT_ID =", import.meta.env.VITE_GOOGLE_CLIENT_ID);

function Main() {
  
  useEffect(() => {
    const interval = setInterval(() => {
      const bannerFrame = document.querySelector('iframe.goog-te-banner-frame');
      if (bannerFrame) {
        bannerFrame.style.display = 'none';
      }
      const skipTranslate = document.querySelector('.goog-te-banner-frame.skiptranslate');
      if (skipTranslate) {
        skipTranslate.style.display = 'none';
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <App />;
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Main />
    </GoogleOAuthProvider>
  </React.StrictMode>
);