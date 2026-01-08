import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";
import { fetchProducts } from "./productsThunks";

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "success" | "failed";
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productsSlice.reducer;
