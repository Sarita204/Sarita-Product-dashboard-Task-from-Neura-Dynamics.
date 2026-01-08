import React from "react";
import "../App.css"
import '../index.css';
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import type { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addFavorite, removeFavorite } from "../features/favorites/favoritesSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: { rate: number; count: number };
}

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const favorites = useSelector((state: RootState) => state.favorites.items);
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
    <div className="relative bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col h-full">
      <span className="absolute top-2 right-2 text-pink-500 cursor-pointer"
        onClick={handleFavorite}>
        {isFav ? (
          <AiFillHeart size={20} className="text-pink-500" />
        ) : (
          <AiOutlineHeart size={20} className="text-gray-400" />
        )}
      </span>
      <div className="h-48 flex items-center justify-center cursor-pointer mb-2 p-4"
        onClick={() => navigate(`/products/${product.id}`)}>
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>

      <div className="flex-1 px-4 pb-4 flex flex-col">
        <span className="text-xs uppercase tracking-wide text-gray-400 text-center mb-1">
          {product.category}
        </span>
        <h2 className="font-semibold text-left mb-4 line-clamp-1">
          {product.title}
        </h2>

        <div className="flex items-center justify-between mt-auto mb-3">
          <p className="text-green-600 font-bold text-lg">
            ${product.price}
          </p>

          <div className="flex items-center text-sm text-gray-600">
            <span className="text-yellow-500 mr-1">★</span>
            {product.rating.rate}
            <span className="ml-1">({product.rating.count})</span>
          </div>
        </div>

        <button className="mt-auto bg-black text-white py-2 rounded hover:bg-gray-800"
          onClick={() => dispatch(addToCart(product))}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}
export default ProductCard;


