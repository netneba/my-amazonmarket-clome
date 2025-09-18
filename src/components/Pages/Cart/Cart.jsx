import React, { useState, useEffect } from "react";
import { useCart } from "../../Utility/CartContext";
import { ACTIONS } from "../../Utility/cartReducer";
import Layout from "../../Layout/Layout";
import CurrencyFormatter from "../../ProductSection/CurrencyFormatter";
import styles from "./CartPage.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { state = { cartItems: [] }, dispatch } = useCart();
  const { cartItems } = state;
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    const initialSelected = cartItems.reduce(
      (acc, item) => ({ ...acc, [item.id]: true }),
      {}
    );
    setSelectedItems(initialSelected);
  }, [cartItems]);

  const handleSelect = (id) =>
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleIncrease = (id) =>
    dispatch({ type: ACTIONS.INCREASE_QUANTITY, payload: id });

  const handleDecrease = (id) =>
    dispatch({ type: ACTIONS.DECREASE_QUANTITY, payload: id });

  const handleRemoveItem = (id) =>
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: id });

  const handleRemoveSelected = () => {
    Object.keys(selectedItems).forEach((id) => {
      if (selectedItems[id]) {
        dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: Number(id) });
      }
    });
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => (selectedItems[item.id] ? acc + item.price * item.quantity : acc),
    0
  );

  const handleCheckout = () => {
    navigate("/payment", {
      state: {
        selectedItems: cartItems.filter((item) => selectedItems[item.id]),
        totalPrice,
      },
    });
  };

  return (
    <Layout>
      <h1 className={styles.title}>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          <div className={styles.cartContainer}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedItems[item.id] || false}
                  onChange={() => handleSelect(item.id)}
                />

                {/* Product Image */}
                <img src={item.image} alt={item.title} className={styles.image} />

                {/* Info */}
                <div className={styles.info}>
                  <h3>{item.title}</h3>
                  <p>Price: <CurrencyFormatter value={item.price} /></p>

                  {/* Quantity */}
                  <div className={styles.quantity}>
                    <Button onClick={() => handleDecrease(item.id)}>-</Button>
                    <span>{item.quantity}</span>
                    <Button onClick={() => handleIncrease(item.id)}>+</Button>
                  </div>

                  {/* Remove button under quantity */}
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            {/* Total, Checkout, Remove Selected at bottom */}
            <div className={styles.bottomActions}>
              <Button
                color="error"
                variant="contained"
                onClick={handleRemoveSelected}
                disabled={
                  Object.values(selectedItems).filter((v) => v).length === 0
                }
              >
                Remove Selected
              </Button>

              <div className={styles.total}>
                <h2>Total: <CurrencyFormatter value={totalPrice} /></h2>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#f0c14b", color: "#111" }}
                  disabled={totalPrice === 0}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default CartPage;
