import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="stars">
      {"★".repeat(full)}{half ? "½" : ""} {rating.toFixed(1)}
    </span>
  );
}

function Badge({ type }) {
  if (!type) return null;
  return <span className={`badge badge-${type}`}>{type.toUpperCase()}</span>;
}

export default function ProductCard({ product }) {
  const { name, cat, price, rating, badge, image, _id } = product;
  const { addToCart } = useCart();

  return (
    <Link to={`/product/${_id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card">
        <div className="card-header">
          <img src={image} alt={name} className="card-img" />
          {badge && <div className="card-badge"><Badge type={badge} /></div>}
        </div>
        <div className="card-body">
          <div className="card-name">{name}</div>
          <div className="card-cat">{cat}</div>
          <Stars rating={rating} />
          <div className="card-bottom">
            <div className="card-price">${price.toFixed(2)}</div>
          </div>
          <button 
            className="add-btn" 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}