import { create } from 'zustand'
import { IProduct } from '../types/product'



export type ICart = {
    product : IProduct;
    quantity : number;


}


export type IProductStore = {
    cart: ICart[];
    addToCart: (product: ICart) => void ;
   removeFromCart: (params: { productId: number; quantity: number }) => void;
}