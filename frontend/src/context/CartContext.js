"use client"; // Enables client-side features like hooks in Next.js

import { createContext, useContext, useEffect, useState } from "react";

// Create a new context to share cart data globally
const CartContext = createContext();

// Create a Provider component that wraps your app
export const CartProvider = ({ children }) => {
  // State to store cart items
  const [cartItems, setCartItems] = useState([]);
  // Create a new context to delete all the content of card
  const clearCart = () => {
    setCartItems([]);
    console.log("Cart after clear:", cartItems);
  };

  // On first load, check if there's a saved cart in localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Every time the cart changes, update localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    // Check if product already exists in cart
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      // If it exists, increase quantity
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If not, add new product with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove a product from the cart by its id
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  // Increase quantity of a product by ID
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity of a product by ID
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove if quantity becomes 0
    );
  };
  const getTotalPrice = () => {
    const total = cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + price * (item.quantity || 0);
    }, 0);

    return total.toFixed(3);
  };

  // Make cart data and functions available to all components
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext in components
export const useCart = () => useContext(CartContext);
