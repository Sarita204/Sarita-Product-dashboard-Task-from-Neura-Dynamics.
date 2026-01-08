import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";

interface FavoritesState {
  items: Product[];
}

const loadFromStorage = (): Product[] => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items: Product[]) => {
  localStorage.setItem("favorites", JSON.stringify(items));
};

const initialState: FavoritesState = {
  items: loadFromStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: { payload: Product }) {
      const exists = state.items.some(
        item => item.id === action.payload.id
      );

      if (!exists) {
        state.items.push(action.payload);
        saveToStorage(state.items);
      }
    },
    removeFavorite(state, action: { payload: number }) {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
      saveToStorage(state.items);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
