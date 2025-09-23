import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../Utility/CartContext";
import Layout from "../../Layout/Layout";
import CurrencyFormatter from "../../ProductSection/CurrencyFormatter";
import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./PaymentPage.module.css";

// Stripe publishable key
const stripePromise = loadStripe("pk_test_51SAL7e8snvUUjWBjZuGttigOssWwB8qOmhFWGlrVUPYapX6lOwx9UDcEG12Ku9WuGYGppkfJDOnUKKOpxtIlyPOz00RDygD0GN");

const CheckoutForm = ({ totalPrice, userName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`http://localhost:4242/payment/create?total=${Math.round(totalPrice * 100)}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!data.clientSecret) throw new Error("PaymentIntent not returned");

      const { paymentIntent, error } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement), billing_details: { name: userName } },
      });

      if (error) setMessage("Payment failed: " + error.message);
      else if (paymentIntent.status === "succeeded") setMessage(`Payment successful! Total: $${paymentIntent.amount / 100}`);
    } catch (err) {
      setMessage("Payment error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className={styles.summary}>
      {userName && <p>Hello, {userName}! Complete your payment below.</p>}
      <h2>Total: <CurrencyFormatter value={totalPrice} /></h2>
      <div className={styles.cardContainer}>
        <CardElement className={styles.cardElement} />
      </div>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#f0c14b", color: "#111", marginTop: "10px" }}
        onClick={handlePayment}
        disabled={loading || !stripe}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

const PaymentPage = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // 1. Get user from context
    const user = state.user;
    if (!user || !user.email) {
      navigate("/auth", { state: { redirectTo: "/payment" } });
      return;
    }

    // 2. Extract first name from email
    const emailName = user.email.split("@")[0].split(".")[0];
    setUserName(emailName.charAt(0).toUpperCase() + emailName.slice(1));

    // 3. Get selected items & total from CartPage state
    const items = location.state?.selectedItems || [];
    const total = location.state?.totalPrice || 0;

    if (!items.length || total === 0) {
      navigate("/cart");
      return;
    }

    setSelectedItems(items);
    setTotalPrice(total);
  }, [state.user, navigate, location.state]);

  if (!selectedItems || selectedItems.length === 0) return null;

  return (
    <Layout>
      <div className={styles.paymentContainer}>
        <h1>Payment</h1>

        <div className={styles.itemsList}>
          {selectedItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.title} className={styles.image} />
              <div className={styles.info}>
                <h3>{item.title}</h3>
                <p>{item.quantity} × <CurrencyFormatter value={item.price} /></p>
                <p>Subtotal: <CurrencyFormatter value={item.price * item.quantity} /></p>
              </div>
            </div>
          ))}
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm totalPrice={totalPrice} userName={userName} />
        </Elements>

        <Button variant="outlined" onClick={() => navigate("/cart")} sx={{ marginTop: "10px" }}>
          Back to Cart
        </Button>
      </div>
    </Layout>
  );
};

export default PaymentPage;
