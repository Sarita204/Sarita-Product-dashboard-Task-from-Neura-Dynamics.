import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { removeFromCart } from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  if (items.length === 0) {
    return <p className="p-6">Your cart is empty 🛒</p>;
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {items.map(item => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-4"
        >
          <div className="flex items-center gap-4">
            <img src={item.image} className="h-20 object-contain" />
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500 text-sm mt-2"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-right mt-6">
        <p className="text-xl font-bold">
          Total: ${total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Cart;
