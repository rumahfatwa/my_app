import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/expo";

export default function SSOCallback() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  console.log("SSOCallback render - isSignedIn:", isSignedIn, "isLoaded:", isLoaded);

  useEffect(() => {
    console.log("useEffect - isSignedIn:", isSignedIn, "isLoaded:", isLoaded);
    if (!isLoaded) return;
    router.replace(isSignedIn ? "/(tabs)" : "/(auth)/sign-up");
  }, [isLoaded, isSignedIn]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}