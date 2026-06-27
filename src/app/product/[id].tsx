import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { supabase } from "../../../libs/supabase";
import { IProduct } from "../../../types/product";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import RatingStart from "@/components/RatingStart";
import useProductStore from "../../../store/useProductStore";
import QuantityButton from "@/components/QuantitiyButton";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const {cart, addToCart} = useProductStore()


  const handleAddToCart = async () =>{
    
      if(product){
        addToCart({product, quantity: 1})
      }
  }
  const toggleWishList = async () => {
    try {
      const previous = isWishlisted;
      setIsWishlisted(!previous);

      if (previous) {
        const { error } = await supabase
          .from("wishlist")
          .delete()
          .eq("pruduct_id", product?.id);

        if (error) {
          setIsWishlisted(previous);
          console.log(error);
        }
      } else {
        const { error } = await supabase.from("wishlist").insert({
          pruduct_id: product?.id,
        });

        if (error) {
          setIsWishlisted(previous);
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProductById = async () => {
      setIsLoading(true);
      try {
        const { data } = await supabase
          .from("fatwa123")
          .select("*")
          .eq("id", id)
          .single();
        setProduct(data);

        const { data: wishlistData } = await supabase
          .from("wishlist")
          .select("*")
          .eq("pruduct_id", id)
          .single();

        setIsWishlisted(!!wishlistData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductById();
  }, [id]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0041c8" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-vista-white">
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <View className="flex-row items-center justify-between">
          <Pressable
           onPress={() => router.canGoBack() ? router.back() : router.push('/(tabs)')}
            className="p-4 ml-2 rounded-2xl bg-secondary"
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>

          <Text className="font-bold tracking-tighter text-4xl text-cod-gray">
            Curator
          </Text>

          <Pressable onPress={toggleWishList} className="bg-secondary p-4 rounded-2xl">
            <Ionicons
              name={isWishlisted ? "heart" : "heart-outline"}
              size={26}
              color={isWishlisted ? "red" : "black"}
            />
          </Pressable>
        </View>

        <View className="px-6 mt-6">
          <Image
            source={{ uri: product?.thumnail }}
            className="w-full h-96 rounded-2xl"
            resizeMode="cover"
          />
        </View>

        <Text className="font-extrabold text-5xl tracking-tighter text-cod-gray mt-6">
          {product?.name}
        </Text>

        <View className="justify-between flex-row mt-2 items-center">
          <Text className="text-scorpion font-light text-3xl">
            {product?.price}k
          </Text>
          <View className="flex-row items-center gap-2">
            <RatingStart rating={product?.rating ?? 0} />
            <Text className="text-sm font-semibold text-scorpion">
              {product?.reviews} reviews
            </Text>
          </View>
        </View>

        <View className="gap-3 p-6 bg-secondary mt-8 rounded-xl">
          <Text className="text-[11px] uppercase tracking-widest font-bold text-gun-powder">
            {product?.decription}
          </Text>

          {cart.some((item) => item.product.id === Number(id))  && product ? <QuantityButton product = {product} className = "w-full mt-8 justify-between "/>: 
          <Pressable  onPress={handleAddToCart}  className="min-w-full bg-cobalt rounded-lg py-6 items-center justify-center flex-row gap-2 mt-10">
            <Ionicons name="bag" size={20} color="white" />
            <Text className="text-white tracking-[0.2em] uppercase font-bold text-base">
              Add To Cart
            </Text>
          </Pressable> }

         
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;