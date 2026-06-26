import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/expo";
import "../../global.css";
import { Platform } from "react-native";
import { useEffect } from "react";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const el = document.createElement("div");
      el.id = "clerk-captcha";
      document.body.appendChild(el);
    }
  }, []);

  const getTokenCache = () => {
    if (Platform.OS === "web") return undefined;
    const { tokenCache } = require("@clerk/expo/token-cache");
    return tokenCache;
  };

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={getTokenCache()}>
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  );
}