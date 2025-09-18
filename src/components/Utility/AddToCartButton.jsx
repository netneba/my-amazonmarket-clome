import React from "react";
import { useCart } from "./CartContext";
import { ACTIONS } from "./cartReducer";

const AddToCartButton = ({ product }) => {
  const { dispatch } = useCart();

  const handleAdd = () => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };

  return <button onClick={handleAdd}>Add to Cart</button>;
};

export default AddToCartButton;
