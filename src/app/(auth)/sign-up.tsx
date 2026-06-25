import { View, Text, Pressable, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import SafeAreaView from "@/components/SafeAreaView"
import { FontAwesome } from "@expo/vector-icons"
import { useSSO } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { OAUTH } from '../../../constans'

const SignUp = () => {
  const { startSSOFlow } = useSSO()
  const router = useRouter()
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null)

  const isGoogleClicked = loadingStrategy === OAUTH.GOOGLE_OAUTH
  const isAppleClicked = loadingStrategy === OAUTH.APPLE_OAUTH

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    setLoadingStrategy(strategy)
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy })

      if (!createdSessionId || !setActive) {
        Alert.alert("Sign-in incomplete", "Please try again")
        return
      }

      await setActive({ session: createdSessionId })
      router.replace("/(tabs)")
    } catch (error) {
      console.log("Error", error)
      Alert.alert("Failed to sign in, please try again.")
    } finally {
      setLoadingStrategy(null)
    }
  }

  return (
    <SafeAreaView className="flex-1 justify-center relative bg-vista-white">
      <View className="px-6">
        <Text className="font-bold text-4xl mb-6">curator</Text>
        <View className="flex gap-4">
          <Text className="text-3xl font-bold">welcome back</Text>
          <Text className="text-gray-600 text-lg">sign in to your favorite curator</Text>
        </View>

        <View className="mt-10 flex gap-6">
          <Pressable
            className={`flex-row justify-center py-6 border gap-3 bg-white border-gray-200 rounded-lg items-center ${isGoogleClicked ? "opacity-70" : ""}`}
            disabled={isGoogleClicked}
            onPress={() => handleSocialAuth("oauth_google")}>
            <Image
              source={require("@/assets/foto/logo-google.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text className="uppercase font-medium text-lg">
              {isGoogleClicked ? "connecting..." : "continue with google"}
            </Text>
          </Pressable>

          <Pressable
            className={`flex-row justify-center py-6 border border-gray-200 gap-3 bg-white rounded-lg items-center ${isAppleClicked ? "opacity-70" : ""}`}
            disabled={isAppleClicked}
            onPress={() => handleSocialAuth("oauth_apple")}>
            <FontAwesome name="apple" size={20} />
            <Text className="uppercase font-medium text-lg">
              {isAppleClicked ? "connecting..." : "continue with apple"}
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="absolute bottom-8 w-full px-8 flex flex-row justify-between">
        <Text className="text-santas-gray uppercase">@ 2026 CURATOR STUDIO</Text>
        <View className="flex flex-row gap-4">
          <Text className="text-santas-gray uppercase">Privacy</Text>
          <Text className="text-santas-gray uppercase">Terms</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignUp