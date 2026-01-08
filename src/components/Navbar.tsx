import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { AiFillHeart } from "react-icons/ai";

const Navbar = () => {

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalQty = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
                ProductStore
            </Link>

            <div className="flex gap-5">
                <Link to="/favorites" className="relative">
                    <AiFillHeart size={24} color="#ee0c80" />
                </Link>

                <Link to="/cart" className="relative">
                    🛒 Cart
                    {totalQty > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-1 rounded-full">
                            {totalQty}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
