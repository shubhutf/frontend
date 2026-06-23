import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`https://amazon-clone-backend-hxsi.onrender.com/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (!product) return <p style={{ padding: "2rem" }}>Product not found</p>;

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate("/cart");
  }

  const description = {
    "Wireless Headphones": "Premium noise-cancelling headphones with 30-hour battery life. Perfect for work and music lovers.",
    "Running Shoes": "Lightweight running shoes with cushioned support. Ideal for daily running and gym workouts.",
    "Cotton T-Shirt": "100% premium cotton t-shirt. Comfortable and durable for everyday wear.",
    "Smart Watch": "Advanced fitness tracking with heart rate monitor. Water-resistant and 7-day battery.",
    "Desk Lamp": "LED desk lamp with adjustable brightness. Eye-friendly and energy efficient.",
    "JavaScript Book": "Learn JavaScript from basics to advanced. Includes 500+ examples and projects.",
    "Yoga Mat": "Non-slip yoga mat with cushioning. Perfect for yoga, pilates, and gym exercises.",
    "Coffee Mug": "Ceramic coffee mug with heat-resistant handle. 350ml capacity.",
    "Denim Jacket": "Classic denim jacket. Versatile and timeless for any casual outfit.",
    "Bluetooth Speaker": "Portable wireless speaker with 360° sound. Water-resistant for outdoor use.",
    "The Alchemist": "A classic novel about following your dreams. Inspiring and thought-provoking read.",
    "Ceramic Vase": "Handcrafted ceramic vase. Perfect for flower arrangements or home decor.",
  };

  function Stars({ rating }) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <span className="detail-stars">
        {"★".repeat(full)}{half ? "½" : ""} {rating.toFixed(1)} ({Math.floor(Math.random() * 200 + 50)} reviews)
      </span>
    );
  }

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-grid">
        {/* Image */}
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Details */}
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="detail-cat">{product.cat}</p>

          <Stars rating={product.rating} />

          <div className="detail-price">${product.price.toFixed(2)}</div>

          <div className="detail-description">
            {description[product.name] || "High quality product"}
          </div>

          {/* Quantity */}
          <div className="detail-qty-selector">
            <label>Quantity:</label>
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          {/* Add to Cart */}
          <button className="detail-add-btn" onClick={handleAddToCart}>
            Add {quantity} to Cart
          </button>

          {/* Features */}
          <div className="detail-features">
            <h3>Key Features</h3>
            <ul>
              <li>✓ Premium Quality</li>
              <li>✓ Fast Shipping</li>
              <li>✓ Easy Returns</li>
              <li>✓ 1 Year Warranty</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}