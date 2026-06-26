import { View, Text, ScrollView, Pressable } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons";

type HeaderProps = {
  categoryFilter: string;
  handleFilterCategory: (item: string) => void;
  categories: string[];
}

const clsx = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const Header = ({ categoryFilter, handleFilterCategory, categories }: HeaderProps) => {


  const handleProfile = async () => {
  try {
    await presentUserProfile()
  } catch (error) {
    console.log(error)
  }
}

  return (
    <View>
      <View className="flex-row items-center justify-between">
        <Text className="text-4xl font-medium tracking-tighter text-cod-gray uppercase">Curator</Text>
        <Ionicons onPress={handleProfile} name="person-circle" size={32} color="#0041c8" />
      </View>

      <View className="mt-10 mb-10">
        <Text className="text-xs uppercase tracking-widest font-medium text-scorpion mb-2">
          Seasonal Essence
        </Text>
        <Text className="text-5xl font-bold tracking-tight text-cod-gray">
          The Modern Collection
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-4 mt-8">
            {categories.map((category) => (
              <Pressable
                key={category}
                onPress={() => handleFilterCategory(category)}
                className={clsx(
                  'whitespace-nowrap px-6 py-3.5 rounded-2xl text-xs uppercase tracking-widest font-semibold',
                  categoryFilter === category ? "bg-cobalt" : "bg-secondary"
                )}
              >
                <Text
                  className={clsx(
                    "uppercase font-bold text-gun-powder",
                    categoryFilter === category && "text-white",
                  )}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Header;