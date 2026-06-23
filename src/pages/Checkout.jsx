import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const { cart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handlePlaceOrder() {
    // Basic validation
    const allFilled = Object.values(form).every(v => v.trim() !== "");
    if (!allFilled) return setError("Please fill in all fields");
    if (cart.length === 0) return setError("Your cart is empty");

    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:3000/api/orders",
        {
          items: cart.map(item => ({
            productId: item._id,
            name: item.name,
            emoji: item.emoji,
            price: item.price,
            quantity: item.quantity,
          })),
          address: form,
          totalPrice,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/order-success");
    } catch (err) {
      setError("Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-grid">

        {/* Address Form */}
        <div className="checkout-form">
          <h2>Delivery Address</h2>

          <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
          <input name="street" placeholder="Street Address" value={form.street} onChange={handleChange} />
          <div className="form-row">
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
            <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
          </div>
          <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />

          {error && <p className="auth-error">{error}</p>}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-items">
            {cart.map(item => (
              <div className="summary-item" key={item._id}>
                <span>{item.emoji} {item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-divider" />

          <div className="summary-row">
            <span>Items ({totalItems})</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span className="free">FREE</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row total">
            <span>Order Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>

      </div>
    </div>
  );
}