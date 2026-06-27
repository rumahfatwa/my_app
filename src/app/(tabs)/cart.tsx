import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useProductStore from "../../../store/useProductStore";
import QuantityButton from "@/components/QuantitiyButton";
import { IProduct } from "../../../types/product";

const Cart = () => {
  const { cart, removeFromCart } = useProductStore();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const taxRate = subtotal * 0;
  const total = subtotal + taxRate;

  const handleRemove = (product: IProduct, quantity: number) => {
    removeFromCart({ productId: product.id, quantity });
  };

  return (
    <SafeAreaView className="flex-1 bg-vista-white">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="font-bold tracking-tight text-4xl">fatwa</Text>
          <Ionicons name="bag" size={24} color="#0041c8" />
        </View>

        <View className="mt-10">
          <Text className="text-5xl font-bold tracking-tighter mb-2 ml-2">
            your bag
          </Text>
          <Text className="text-scorpion uppercase tracking-widest text-sm font-medium">
            {cart.length} items Curated
          </Text>
        </View>

        {cart.map(({ product, quantity }) => (
          <View key={product.id} className="mt-12 flex-row gap-8">
            <Image
              source={{ uri: product.thumnail }}
              className="w-[49%] rounded-2xl"
              style={{ height: 280 }}
            />
            <View className="flex-1 gap-2">
              <Text className="font-bold text-xl">{product.name}</Text>
              <Text className="font-bold text-lg">{product.price}k</Text>
              <QuantityButton product={product} />
              <Pressable onPress={() => handleRemove(product, quantity)}>
                <Ionicons name="trash" size={24} color="#5f5e5e" />
              </Pressable>
            </View>
          </View>
        ))}

        <View className="bg-white p-6 rounded-xl mt-10 gap-4">
          <Text className="text-3xl font-bold tracking-tight mb-2">
            Order Summary
          </Text>

          <View className="flex-row justify-between items-center">
            <Text className="text-scorpion text-lg">Sub total</Text>
            <Text className="font-medium text-xl">
              {subtotal.toLocaleString()}k
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-scorpion text-lg">Estimated Shipping</Text>
            <Text className="font-medium text-xl">Free</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-scorpion text-lg">Taxes</Text>
            <Text className="font-medium text-xl">{taxRate.toLocaleString()}</Text>
          </View>

          <View className="h-px bg-[#F0EDED] w-full my-2" />

          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold">Total</Text>
            <View className="items-end">
              <Text className="text-sm text-scorpion uppercase">Rupiah</Text>
              <Text className="text-3xl font-bold tracking-tighter">
                {total.toLocaleString()}k
              </Text>
            </View>
          </View>
        </View>

        <Pressable className="bg-cobalt px-10 py-6 rounded-xl self-start m-auto mt-6">
          <Text className="font-bold text-white text-xl">proceed to Checkout</Text>
        </Pressable>

        <View className="gap-4 mt-6">
          <View className="flex-row items-center gap-3">
            <Ionicons name="shield-checkmark" size={24} color="#5f5e5e" />
            <Text className="uppercase tracking-widest text-scorpion text-sm">
              secure encrypted payment
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Ionicons name="car" size={24} color="#5f5e5e" />
            <Text className="uppercase tracking-widest text-scorpion text-sm">
              fast doorstep delivery
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;