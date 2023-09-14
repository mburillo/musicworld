import React, { createContext, useState, useEffect } from 'react';
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const initialCart = JSON.parse(localStorage.getItem('userCart')) || [];
  const [cartItems, setCartItems] = useState(initialCart);
  
  useEffect(() => {
    localStorage.setItem('userCart', JSON.stringify(cartItems));
}, [cartItems]);


  const addToCart = (product, quantity = 1) => {
      setCartItems(prevItems => {
          const existingItem = prevItems.find(item => item.id === product.id);
          
          if (existingItem) {
              return prevItems.map(item =>
                  item.id === product.id
                      ? { ...item, quantity: item.quantity + quantity }
                      : item
              );
          } else {
              return [...prevItems, { ...product, quantity }];
          }
      });
  };

  const removeFromCart = (productId, quantity = 1) => {
      setCartItems(prevItems => {
          const existingItem = prevItems.find(item => item.id === productId);
          
          if (existingItem && existingItem.quantity > quantity) {
              return prevItems.map(item =>
                  item.id === productId
                      ? { ...item, quantity: item.quantity - quantity }
                      : item
              );
          } else {
              return prevItems.filter(item => item.id !== productId);
          }
      });
  };

  const getTotalPrice = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
      <CartContext.Provider value={{ showModal, setShowModal, cartItems, setCartItems, addToCart, removeFromCart, getTotalPrice }}>
          {children}
      </CartContext.Provider>
  );
};
