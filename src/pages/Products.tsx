import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { fetchProducts } from "../features/products/productsThunks";
import ProductCard from "../components/ProductCard";
import "../App.css"
import '../index.css';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector((state: RootState) => state.products.items) as Product[];
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading products</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4 
    gap-6
  ">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>

  );
};

export default Products;
