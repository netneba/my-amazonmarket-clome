import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import CurrencyFormatter from "../../ProductSection/CurrencyFormatter";
import { Button } from "@mui/material";
import styles from "./PaymentPage.module.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems = [], totalPrice = 0 } = location.state || {};

  return (
    <Layout>
      <div className={styles.paymentContainer}>
        <h1>Payment</h1>

        {selectedItems.length === 0 ? (
          <p>No items selected for checkout.</p>
        ) : (
          <>
            <div className={styles.itemsList}>
              {selectedItems.map((item) => (
                <div key={item.id} className={styles.item}>
                  <img src={item.image} alt={item.title} className={styles.image} />
                  <div className={styles.info}>
                    <h3>{item.title}</h3>
                    <p>
                      {item.quantity} × <CurrencyFormatter value={item.price} />
                    </p>
                    <p>
                      Subtotal: <CurrencyFormatter value={item.price * item.quantity} />
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <h2>Total: <CurrencyFormatter value={totalPrice} /></h2>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#f0c14b", color: "#111", marginRight: "10px" }}
              >
                Pay Now
              </Button>
              <Button variant="outlined" onClick={() => navigate("/cart")}>
                Back to Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default PaymentPage;
