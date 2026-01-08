export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    return res.data;
  }
);
