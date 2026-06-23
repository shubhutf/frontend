import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    clearCart(); // empty the cart after order placed
  }, []);

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1>Order Placed!</h1>
        <p>Your order has been placed successfully. We'll deliver it soon.</p>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    </div>
  );
}