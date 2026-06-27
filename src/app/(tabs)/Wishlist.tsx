import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { View, Text, FlatList, Image, Pressable, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IProduct } from "../../../types/product";
import { supabase } from "../../../libs/supabase";
import { useFocusEffect } from "expo-router";
import QuantityButton from "@/components/QuantitiyButton";
import useProductStore from "../../../store/useProductStore";

export default function Wishlist() {
  const [allWishlist, setAllWishlist] = useState<IProduct[]>([]);
  const { cart, addToCart } = useProductStore();

  const fetchWishlist = async () => {
    try {
      const { data: wishlistData } = await supabase
        .from("wishlist")
        .select("pruduct_id");

      if (wishlistData && wishlistData.length > 0) {
        const ids = wishlistData.map((item: any) => item.pruduct_id);

        const { data: products } = await supabase
          .from("fatwa123")
          .select("*")
          .in("id", ids);

        setAllWishlist(products || []);
      } else {
        setAllWishlist([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchWishlist();
    }, [])
  );

  const removeFromWishlist = async (productId: number) => {
    try {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("pruduct_id", productId);

      if (!error) {
        setAllWishlist((prev) => prev.filter((item) => item.id !== productId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product: IProduct) => {
    addToCart({ product, quantity: 1 });
  };

  const Header = ({ count }: { count: number }) => {
    return (
      <>
        <View className="flex-row items-center justify-between">
          <Text className="text-4xl font-medium tracking-tighter text-cod-gray uppercase">
            Curator
          </Text>
          <Ionicons name="bag" size={24} color="#5f5e5e" />
        </View>

        <View className="mt-10 mb-14">
          <Text className="text-xs uppercase tracking-widest font-medium text-scorpion mb-3">
            seleksi
          </Text>
          <Text className="text-5xl font-bold tracking-tight text-cod-gray">
            wishlist
          </Text>
          <Text className="mt-6 text-scorpion text-xl font-medium leading-relaxed">
            ini adalah tempat like yang semua bren ada disini
          </Text>
          <Text className="text-4xl font-bold text-gun-powder mt-6 ml-10">
            {count.toString().padStart(2, "0")}
          </Text>
          <Text className="text-[10px] uppercase tracking-widest text-gun-powder font-medium mt-2">
            saved pieces
          </Text>
        </View>
      </>
    );
  };

  const renderItem = ({ item }: { item: IProduct }) => (
    <View className="mt-8">
      <View className="relative">
        <Image
          source={{ uri: item.thumnail }}
          className="w-full rounded-xl"
          style={{ height: 400 }}
          resizeMode="cover"
        />
        <Pressable
          className="absolute top-4 right-4 px-2.5 py-3.5 rounded-2xl bg-[#fcf9f8e6]"
          onPress={() => removeFromWishlist(item.id)}
        >
          <Ionicons name="close" size={30} color="#1c1b1b" />
        </Pressable>
      </View>

      <Text className="uppercase text-scorpion font-bold mt-2">{item.catecory}</Text>
      <View className="flex-row justify-between items-center mt-1">
        <Text className="font-bold text-2xl">{item.name}</Text>
        {cart.some((cartItem) => cartItem.product.id === item.id) ? (
          <QuantityButton product={item} className="justify-between" />
        ) : (
          <Pressable onPress={() => handleAddToCart(item)}>
            <Text className="text-cobalt font-bold tracking-tight text-lg uppercase">Quick Add</Text>
          </Pressable>
        )}
      </View>
      <Text className="font-medium text-lg text-gun-powder">{item.price}k</Text>
    </View>
  );

  if (Platform.OS === "web") {
    return (
      <SafeAreaView className="flex-1 bg-vista-white">
        <ScrollView className="px-8">
          <Header count={allWishlist.length} />
          {allWishlist.length === 0 ? (
            <Text className="text-center text-scorpion">Wishlist kosong</Text>
          ) : (
            allWishlist.map((item) => (
              <View key={item.id}>{renderItem({ item })}</View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-vista-white">
      <FlatList
        className="px-8"
        data={allWishlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={<Header count={allWishlist.length} />}
        ListEmptyComponent={
          <Text className="text-center text-scorpion">Wishlist kosong</Text>
        }
      />
    </SafeAreaView>
  );
}