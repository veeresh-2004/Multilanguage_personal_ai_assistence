import { GoogleAuth } from "@capacitor/google-auth";

export const isNative = () => {
  return !!window.Capacitor?.isNativePlatform;
};

export const googleLogin = async (webLoginFn) => {
  if (isNative()) {
    // 📱 Native Android/iOS Login
    const result = await GoogleAuth.signIn();
    return {
      email: result.email,
      name: result.givenName + " " + result.familyName,
      picture: result.imageUrl,
      token: result.idToken,
    };
  } else {
    // 🌐 Web Login
    return await webLoginFn();
  }
};
