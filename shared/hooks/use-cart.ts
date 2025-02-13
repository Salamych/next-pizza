import React from "react";
import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "../store";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemsValues } from "../services/dto/cart.dto";

type ReturnProps = {
  loading: boolean;
  totalAmount: number;
  items: CartStateItem[];
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: CreateCartItemsValues) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  
}

export const useCart = (): ReturnProps => {
  const cartState = useCartStore(
      useShallow((state) => state));
  
    React.useEffect(() => {
      cartState.fetchCartItems();
    }, []);

    return cartState;
}