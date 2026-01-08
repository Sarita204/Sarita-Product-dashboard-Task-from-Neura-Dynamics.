import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../features/products/productsThunks";
import { CiSearch } from "react-icons/ci";


const ProductListingPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);


  // --- search, filter, sort states ---
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortPrice, setSortPrice] = useState<"asc" | "desc" | "none">("none");

  // --- categories for filter dropdown ---
  const categories = useMemo(() => {
    const cats = products.map(p => p.category);
    return ["all", ...Array.from(new Set(cats))];
  }, [products]);

  // --- Debounced search ---
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  // --- Filtered & Sorted products ---
  const filteredProducts = useMemo(() => {
    let temp = [...products];

    if (category !== "all") {
      temp = temp.filter(p => p.category === category);
    }

    if (debouncedSearch) {
      temp = temp.filter(p =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (sortPrice === "asc") temp.sort((a, b) => a.price - b.price);
    if (sortPrice === "desc") temp.sort((a, b) => b.price - a.price);

    return temp;
  }, [products, category, debouncedSearch, sortPrice]);

  if (status === "loading") return <div className="text-center my-8">Loading products...</div>;
  if (status === "failed") return <div className="text-center my-8">Failed to load products.</div>;

  return (
    <div className="container my-6 p-2">
      <h2 className="text-2xl font-semibold mb-6">Products</h2>

      <div className="flex flex-col md:flex-row-reverse md:items-center md:justify-between mb-6 gap-4">
        <div className="flex gap-5">
          <select
            className="border p-2 rounded"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            value={sortPrice}
            onChange={e =>
              setSortPrice(e.target.value as "asc" | "desc" | "none")
            }
          >
            <option value="none">Sort by price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <CiSearch size={20} />
          </span>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
