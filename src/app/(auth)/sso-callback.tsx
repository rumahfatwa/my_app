import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/expo";

export default function SSOCallback() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(tabs)");
    }
  }, [isSignedIn]);

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
    </View>
  );
}