import Header from "@/components/Header";
import SafeAreaView from "@/components/SafeAreaView";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { supabase } from "../../../libs/supabase";
import { IProduct } from "../../../types/product";
const Index = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const fetchProducts = async () => {
    try {
      const { data } = await supabase.from("fatwa123").select("*");
      setProducts(data || []);
      const allCategory = data
        ? [...new Set(data.map((product) => product.catecory))]
        : [];
      setCategories(allCategory);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductByCategory = async () => {
    try {
      const { data } = await supabase
        .from("fatwa123")
        .select("*")
        .eq("catecory", categoryFilter);
      setProducts(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterCategory = (category: string) => {
    setCategoryFilter(category);
  };

  useEffect(() => {
    if (categoryFilter !== "ALL") {
      fetchProductByCategory();
    } else {
      fetchProducts();
    }
  }, [categoryFilter]);

  return (
    <SafeAreaView className="flex-1 bg-vista-white">
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <Header
            categoryFilter={categoryFilter}
            categories={["ALL", ...categories]}
            handleFilterCategory={handleFilterCategory}
          />
        }
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/product/${item.id}`)}
            className="flex-1 mb-3 bg-white rounded-2xl overflow-hidden"
          >
            <Image
              source={{ uri: item.thumnail }}
              className="w-full h-40"
              resizeMode="cover"
            />
            <View className="gap-1.5 p-3">
              <Text className="text-base uppercase tracking-widest font-medium text-scorpion">
                {item.catecory}
              </Text>
              <Text className="text-lg font-medium text-cod-gray leading-tight">
                {item.name}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default Index;
