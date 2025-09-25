import React, { createContext, useReducer, useEffect, useContext } from "react";
import { cartReducer, initialState } from "./cartReducer";
import { ACTIONS } from "./actions";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    localStorage.setItem("selectedItems", JSON.stringify(state.selectedItems));
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("orders", JSON.stringify(state.orders));
  }, [state]);

  // Add logout function
  const logout = () => {
    dispatch({ type: ACTIONS.LOGOUT_USER });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, logout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
