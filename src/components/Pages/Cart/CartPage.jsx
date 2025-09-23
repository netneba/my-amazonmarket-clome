import React, { useEffect } from "react";
import { useCart } from "../../Utility/CartContext";
import { ACTIONS } from "../../Utility/actions";
import Layout from "../../Layout/Layout";
import CurrencyFormatter from "../../ProductSection/CurrencyFormatter";
import styles from "./CartPage.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { state, dispatch } = useCart();
  const { cartItems, selectedItems, user } = state;
  const navigate = useNavigate();

  // Initially select all items
  useEffect(() => {
    const initialSelected = cartItems.reduce(
      (acc, item) => ({ ...acc, [item.id]: true }),
      {}
    );
    dispatch({ type: ACTIONS.SELECT_ITEMS, payload: initialSelected });
  }, [cartItems, dispatch]);

  const handleSelect = (id) =>
    dispatch({
      type: ACTIONS.SELECT_ITEMS,
      payload: { ...selectedItems, [id]: !selectedItems[id] },
    });

  const handleIncrease = (id) => dispatch({ type: ACTIONS.INCREASE_QUANTITY, payload: id });
  const handleDecrease = (id) => dispatch({ type: ACTIONS.DECREASE_QUANTITY, payload: id });
  const handleRemoveItem = (id) => dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: id });
  const handleRemoveSelected = () => {
    Object.keys(selectedItems).forEach((id) => {
      if (selectedItems[id]) dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: Number(id) });
    });
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => (selectedItems[item.id] ? acc + item.price * item.quantity : acc),
    0
  );

  const handleCheckout = () => {
    if (!user) {
      // Redirect to Auth and pass current path for return
      navigate("/auth", { state: { redirectTo: "/payment" } });
      return;
    }

    const selected = cartItems.filter((item) => selectedItems[item.id]);
    if (selected.length === 0) {
      alert("Please select at least one item to proceed.");
      return;
    }

    // Navigate to PaymentPage with selected items & total
    navigate("/payment", {
      state: {
        selectedItems: selected,
        totalPrice: totalPrice,
      },
    });
  };

  return (
    <Layout>
      <h1 className={styles.title}>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <div className={styles.cartContainer}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <input
                type="checkbox"
                checked={selectedItems[item.id] || false}
                onChange={() => handleSelect(item.id)}
              />
              <img src={item.image} alt={item.title} className={styles.image} />
              <div className={styles.info}>
                <h3>{item.title}</h3>
                <p>Price: <CurrencyFormatter value={item.price} /></p>
                <div className={styles.quantity}>
                  <Button onClick={() => handleDecrease(item.id)}>-</Button>
                  <span>{item.quantity}</span>
                  <Button onClick={() => handleIncrease(item.id)}>+</Button>
                </div>
                <Button color="error" variant="outlined" onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <div className={styles.bottomActions}>
            <Button
              color="error"
              variant="contained"
              onClick={handleRemoveSelected}
              disabled={Object.values(selectedItems).filter(Boolean).length === 0}
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
      )}
    </Layout>
  );
};

export default CartPage;
