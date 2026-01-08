import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
          console.log("ADD TO CART:", action.payload); 
      const existing = state.items.find(
        item => item.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
