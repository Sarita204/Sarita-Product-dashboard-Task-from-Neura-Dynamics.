import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { removeFavorite } from "../../features/favorites/favoritesSlice";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch<AppDispatch>();

  if (favorites.length === 0) {
    return (
      <div className="container my-8 text-center">
        <h3 className="mb-4 text-2xl font-semibold">Favorites</h3>
        <div className="text-gray-500">No favorites yet. Add some products!</div>
      </div>
    );
  }

  return (
    <div className="container my-8">
      <h3 className="mb-6 text-2xl font-semibold">Favorites</h3>
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-sm text-gray-600 hover:text-black flex items-center pl-6"
      >
        ← Back to Home
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col h-full relative">
            <img
              src={product.image}
              alt={product.title}
              className="h-48 object-contain p-4 cursor-pointer"
            />

            <div className="px-4 pb-4 flex flex-col flex-1">
              <span className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                {product.category}
              </span>
              <h2 className="font-semibold text-md mb-2 line-clamp-2">{product.title}</h2>
              <p className="text-green-600 font-bold text-lg mt-auto">${product.price}</p>

              <button
                className="mt-3 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                onClick={() => dispatch(removeFavorite(product.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;

