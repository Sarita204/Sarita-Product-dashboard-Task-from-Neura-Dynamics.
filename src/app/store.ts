import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer, 
    favorites: favoritesReducer,

  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
