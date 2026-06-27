import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { IProduct } from '../types/product';
import clsx from 'clsx';
import useProductStore from '../store/useProductStore';

type QuantityButtonProps = {
  className?: string;
  product: IProduct;
};

const QuantityButton = ({ className, product }: QuantityButtonProps) => {
  // Pastikan nama fungsi sesuai dengan yang ada di store (biasanya addToCart)
  const { addToCart, removeFromCart, cart } = useProductStore();

  // Mencari kuantitas produk spesifik di dalam cart
  const productquantity = cart.find((item) => item.product.id === product.id);
  const quantity = productquantity ? productquantity.quantity : 0;

  const handleRemoveFromCart = () => {
    removeFromCart({ productId: product.id, quantity: 1 });
  };

  const handleAddToCart = () => {
    addToCart({ product, quantity: 1 });
  };

  return (
    <View className={clsx("flex-row bg-secondary items-center rounded self-start", className)}>
      <Pressable className='py-3 px-6' onPress={handleRemoveFromCart}>
        <Text className='text-[24px]'>-</Text>
      </Pressable>

      <Text className='text-[18px] font-bold'>{quantity}</Text>

      <Pressable className='py-3 px-6' onPress={handleAddToCart}>
        <Text className='text-[24px]'>+</Text>
      </Pressable>
    </View>
  );
};

export default QuantityButton;