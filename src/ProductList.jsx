import React from 'react';
import './ProductList.css'; // Ensure this matches your CSS file name

// 1. Define the Dummy Data
const dummyProducts = [
  {
    id: 1,
    name: 'Wireless Noise-Canceling Headphones',
    price: 299.99,
    description: 'Premium over-ear headphones with active noise cancellation and up to 30 hours of battery life.',
    image: 'https://via.placeholder.com/400x300/e2e8f0/475569?text=Headphones'
  },
  {
    id: 2,
    name: 'Smart Fitness Tracker',
    price: 149.50,
    description: 'Monitor your daily activity, heart rate, and sleep cycles with this lightweight, waterproof tracker.',
    image: 'https://via.placeholder.com/400x300/e2e8f0/475569?text=Smart+Watch'
  },
  {
    id: 3,
    name: 'Mechanical Gaming Keyboard',
    price: 129.00,
    description: 'RGB backlit mechanical keyboard featuring tactile switches for a responsive typing experience.',
    image: 'https://via.placeholder.com/400x300/e2e8f0/475569?text=Keyboard'
  },
  {
    id: 4,
    name: '4K Action Camera',
    price: 199.99,
    description: 'Capture your outdoor adventures in stunning 4K resolution. Includes underwater housing.',
    image: 'https://via.placeholder.com/400x300/e2e8f0/475569?text=Action+Camera'
  }
];

// 2. Build the Component
const ProductList = () => {
  return (
    <div className="product-container">
      <h2>Featured Products</h2>
      
      <div className="product-grid">
        {/* Iterate through the data array to create a card for each item */}
        {dummyProducts.map((product) => (
          <div key={product.id} className="product-card">
            
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image" 
            />
            
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            
            {/* Format the price to always show 2 decimal places */}
            <div className="product-price">${product.price.toFixed(2)}</div>
            
            <button 
              className="add-to-cart-btn"
              onClick={() => alert(`Added ${product.name} to your cart!`)}
            >
              Add toooo Cart
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;