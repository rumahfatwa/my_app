import { Tabs, Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import "../../../global.css";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-up" />;
  }

  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: "#0041c8",
      headerShown: false // Ubah ke true jika ingin menampilkan header
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="cart" 
        options={{ 
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "bag" : "bag-outline"} size={24} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="wishlist" 
        options={{ 
          title: 'Wishlist',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} size={24} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}