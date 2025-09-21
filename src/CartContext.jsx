import React, { createContext, useContext, useState,  useEffect, useRef, } from "react";
  



  const CartContext = createContext();
  const CART_STORAGE_KEY = "myAppCart";
  
  export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const isFirstLoad = useRef(true); // Prevent overwrite on first render
  
    // Load from localStorage
    useEffect(() => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) {
            setCartItems(parsed);
            console.log("✅ Loaded from localStorage:", parsed);
          } else {
            console.warn("⚠️ Invalid cart data in localStorage.");
          }
        }
      } catch (err) {
        console.error("❌ Failed to load cart from localStorage:", err);
      }
    }, []);
  

    
    // Save to localStorage AFTER first load
    useEffect(() => {
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
        return;
      }
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      console.log(" Saved to localStorage:", cartItems);
    }, [cartItems]);
  



    // Add product to cart
    const addToCart = (product, selectedOptions = []) => {
      setCartItems((prevItems) => {
        const exists = prevItems.find((item) => item.id === product.id);
        if (exists) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevItems, { ...product, quantity: 1, selectedOptions }];
      });
    };
  
    // Update quantity
    const updateQuantity = (productId, quantity) => {
        console.log("Update quantity called:", productId, quantity);
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
        );
      };
  
    // Remove product from cart
    const removeFromCart = (productId) => {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
    };
  
    return (
      <CartContext.Provider
        value={{ cartItems, setCartItems, addToCart, updateQuantity, removeFromCart }}
      >
        {children}
      </CartContext.Provider>
    );
  };
  
  export const useCart = () => useContext(CartContext);