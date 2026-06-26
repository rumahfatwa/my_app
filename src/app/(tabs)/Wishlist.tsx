import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Wishlist() {
  return (
    <SafeAreaView className="flex-1 bg-vista-white">
      <View className="px-8 mt-4 pb-4">
        <FlatList
          data={[]}
          keyExtractor={(item) => item.toString()}
          renderItem={() => null}
          ListEmptyComponent={
            <Text className="text-center text-scorpion mt-10">
              Wishlist kosong
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}