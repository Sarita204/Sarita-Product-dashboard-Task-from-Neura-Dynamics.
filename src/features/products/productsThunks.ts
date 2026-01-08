import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";

export const fetchProducts = createAsyncThunk<
  Product[]
>("products/fetchProducts", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
});
