import React, { createContext, useContext, useReducer } from "react";
import { cartReducer } from "./cartReducer";

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
