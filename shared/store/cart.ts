import { create } from "zustand";
import { getCartDetails, getCartItemDetails } from "../lib";
import { Api } from "../services/api-client";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemsValues } from "../services/dto/cart.dto";



export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  /*Получение товаров из корзины */
  fetchCartItems: () => Promise<void>;

  /*Запрос на обновление количества товаров */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  /*Запрос на добавление товара в корзину */
  //TODO: типизировать values (CreateCartItemValues)
  addCartItem: (values: any) => Promise<void>;

  /*Запрос на удвление товара из корзины */
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,
 
  fetchCartItems: async () => {
    try {
      set({loading: true, error: false});
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({error: true}); 
    }
    finally {
      set({loading: false});
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({loading: true, error: false});
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({error: true}); 
    }
    finally {
      set({loading: false});
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set((state) => (
        {
          loading: true, 
          error: false, 
          items: state.items.map(item => (item.id === id ? {...item, disabled: true} : item))
        }
      ));
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({error: true}); 
    }
    finally {
      set((state) => (
        {
          loading: false, 
          items: state.items.map(item => (item.id === id ? {...item, disabled: false} : item))
        }
      ));
    }
  },
  addCartItem: async (values: CreateCartItemsValues) => {
    try {
      set({loading: true, error: false});
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({error: true}); 
    }
    finally {
      set({loading: false});
    }
  }
}))