import { useState, useEffect, useMemo } from "react";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import "./App.css";
import axios from "axios";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [cat, setCat] = useState("all");
  const { totalItems } = useCart();
const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user"));

function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.reload();
}

  // Fetch products from backend when the page loads
  useEffect(() => {
    axios.get("https://amazon-clone-backend-hxsi.onrender.com/api/products")
      .then(res => res.data)
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []); // [] means run only once on page load

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      (cat === "all" || p.cat === cat) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
       p.cat.toLowerCase().includes(search.toLowerCase()))
    );
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, search, sort, cat]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading products...</p>;

//const user = JSON.parse(localStorage.getItem("user"));

function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.reload();
}

  return (
    <div className="page">
      <div className="navbar">
        <span>🛒 Amazon Clone</span>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <button className="cart-btn" onClick={() => navigate("/cart")}>
            🛒 Cart {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </button>
          {user ? (
            <>
              <span style={{ fontSize: "14px", color: "white" }}>Hi, {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/register")}>Register</button>
            </>
          )}
        </div>
      </div>
      <div className="header">
        <h1>Our Products</h1>
        <p>Fresh picks, great prices.</p>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
        <select value={cat} onChange={e => setCat(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home">Home</option>
          <option value="Sports">Sports</option>
          <option value="Books">Books</option>
        </select>
      </div>

      <p className="count">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>

      {filtered.length === 0 ? (
        <p className="empty">No products match your search.</p>
      ) : (
        <div className="grid">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}

// redeploy