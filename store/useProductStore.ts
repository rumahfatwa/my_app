import { create } from "zustand"
import { IProductStore } from "./productStore"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

const useProductStore = create<IProductStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (cartItem) => {
        const { product, quantity = 1 } = cartItem;
        const existingCart = get().cart;

        const existingItemIndex = existingCart.findIndex(
          (item) => item.product.id === product.id
        );

        let updatedCart;

        if (existingItemIndex >= 0) {
          updatedCart = existingCart.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          updatedCart = [...existingCart, cartItem];
        }

        set({ cart: updatedCart });
      },
      removeFromCart: ({ productId, quantity = 1 }) => {
        const existingCart = get().cart;

        const existingItemIndex = existingCart.findIndex(
          (item) => item.product.id === productId
        );

        if (existingItemIndex === -1) return;

        const updatedCart = existingCart
          .map((item) => {
            if (item.product.id !== productId) return item;
            return {
              ...item,
              quantity: item.quantity - quantity
            };
          })
          .filter((item) => item.quantity > 0);

        set({ cart: updatedCart });
      },
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)

export default useProductStore