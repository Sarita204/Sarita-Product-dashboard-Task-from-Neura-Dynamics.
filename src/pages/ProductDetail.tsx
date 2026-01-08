import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { addToCart } from "../features/cart/cartSlice";
import type { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addFavorite, removeFavorite } from "../features/favorites/favoritesSlice";


const ProductDetails = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading || !product) {
    return <p className="p-6">Loading...</p>;
  }

  const isFav = favorites.some(item => item.id === product.id);
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFav) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-sm text-gray-600 hover:text-black flex items-center gap-1"
      >
        ← Back to Home
      </button>
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-14">
        <div className="flex justify-center items-center bg-gray-50 rounded-xl p-10 overflow-hidden group">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[420px] object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-col text-left">

          <h1 className="text-3xl font-semibold leading-snug mb-3">
            {product.title}
          </h1>

          <div className="flex items-center gap-6 mb-4">
            <p className="text-green-600 text-3xl font-bold">
              ${product.price}
            </p>

            <div className="flex items-center text-gray-600">
              <span className="text-yellow-500 text-lg mr-1">★</span>
              <span className="font-medium">
                {product.rating.rate}
              </span>
              <span className="ml-1 text-sm">
                ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5 mb-4">

            <span className="w-fit bg-gray-100 text-gray-700 text-sm px-4 py-1 rounded-full mb-6">
              {product.category}
            </span>

            <span className="w-fit px-4 py-1 rounded-full mb-6" onClick={handleFavorite}>
              {isFav ? (
                <AiFillHeart size={20} className="text-pink-500" />
              ) : (
                <AiOutlineHeart size={20} className="text-gray-400" />
              )}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>

          </div>
        </div>
      </div>

    </div>

  );
};

export default ProductDetails;