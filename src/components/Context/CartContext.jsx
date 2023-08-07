// CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => [...prevItems, product]);
  };
  
  return (
    <CartContext.Provider value={{ showModal, setShowModal, cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
