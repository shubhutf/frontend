import { createContext, useContext, useState } from "react";

// 1. Create the context
const CartContext = createContext();

// 2. Create a provider — this wraps your app and gives everyone access to cart
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add item to cart
  function addToCart(product) {
    setCart(prev => {
      // if product already in cart, just increase quantity
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // otherwise add it fresh with quantity 1
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  // Remove item completely from cart
  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item._id !== id));
  }

  // Update quantity — if 0, remove the item
  function updateQuantity(id, quantity) {
    if (quantity === 0) return removeFromCart(id);
    setCart(prev =>
      prev.map(item => item._id === id ? { ...item, quantity } : item)
    );
  }

  function clearCart() {
    setCart([]);
    }

  // Total number of items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart}}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom hook — easy way to use cart anywhere
export function useCart() {
  return useContext(CartContext);
}