import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


export default function CartPage() {    
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) return (
    <div className="cart-empty">
      <h2>Your cart is empty</h2>
      <button onClick={() => navigate("/")}>Continue Shopping</button>
    </div>
  );

  return (
    <div className="cart-page">
      <h1>Your Cart ({totalItems} items)</h1>

      <div className="cart-list">
        {cart.map(item => (
          <div className="cart-item" key={item._id}>

            {/* Product info */}
            <div className="cart-item-info">
              <span className="cart-emoji">{item.emoji}</span>
              <div>
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-cat">{item.cat}</p>
              </div>
            </div>

            {/* Quantity controls */}
            <div className="cart-qty">
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
            </div>

            {/* Price */}
            <div className="cart-item-price">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            {/* Remove */}
            <button className="cart-remove" onClick={() => removeFromCart(item._id)}>
              Remove
            </button>

          </div>
        ))}
      </div>

      {/* Total */}
      <div className="cart-total">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <button className="checkout-btn" onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </button>
      <button className="continue-btn" onClick={() => navigate("/")}>
        Continue Shopping
      </button>
    </div>
  );
}
