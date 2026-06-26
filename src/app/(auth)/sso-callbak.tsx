import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/expo";

export default function SSOCallback() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    
    if (isSignedIn) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/sign-up");
    }
  }, [isSignedIn, isLoaded]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}