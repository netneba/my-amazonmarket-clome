import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../Utility/CartContext";
import { ACTIONS } from "../../Utility/actions";
import Layout from "../../Layout/Layout";
import CurrencyFormatter from "../../ProductSection/CurrencyFormatter";
import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./PaymentPage.module.css";
import { db } from "../../Utility/firebase";
import { GridLoader } from "react-spinners";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

// Stripe publishable key
const stripePromise = loadStripe("pk_test_51SAL7e8snvUUjWBjZuGttigOssWwB8qOmhFWGlrVUPYapX6lOwx9UDcEG12Ku9WuGYGppkfJDOnUKKOpxtIlyPOz00RDygD0GN");

const CheckoutForm = ({ totalPrice, userName, user, selectedItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { dispatch } = useCart(); 
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setMessage("");

    try {
      //  Create payment intent on server
      const res = await fetch(
        ` https://my-market-backend-hw9t.onrender.com/payment/create?total=${Math.round(totalPrice * 100)}`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!data.clientSecret) throw new Error("PaymentIntent not returned");

      // Confirm card payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: userName || "Guest" },
        },
      });

      if (error) {
        setMessage("Payment failed: " + error.message);
      } else if (paymentIntent.status === "succeeded") {
        setMessage(`Payment successful! Total: $${paymentIntent.amount / 100}`);

        // Save order to Firestore
        await setDoc(
          doc(collection(db, "users", user?.uid, "orders"), paymentIntent.id),
          {
            items: selectedItems,
            amount: paymentIntent.amount / 100,
            created: serverTimestamp(),
            status: "paid",
          }
        );

        // Clear cart in context
        dispatch({ type: ACTIONS.CLEAR_CART });

        // Redirect to Orders page
        navigate("/order");
      }
    } catch (err) {
      setMessage("Payment error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className={styles.summary}>
      <h2>Total: <CurrencyFormatter value={totalPrice} /></h2>
      <div className={styles.cardContainer}>
        <CardElement className={styles.cardElement} />
      </div>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#f0c14b", color: "#111", marginTop: "10px", minHeight: "40px" }}
        onClick={handlePayment}
        disabled={loading || !stripe}
      >
        {loading ? <GridLoader size={8} color="#111" /> : "Pay Now"}
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
    const user = state.user;
    if (!user || !user.email) {
      navigate("/auth", { state: { message: "Please login to pay", redirectTo: "/payment" } });
      return;
    }

    const emailName = user.email.split("@")[0].split(".")[0];
    setUserName(emailName.charAt(0).toUpperCase() + emailName.slice(1));

    const items = location.state?.selectedItems || [];
    const total = location.state?.totalPrice || 0;

    if (!items.length || total === 0) {
      navigate("/cart");
      return;
    }

    // Ensure quantity and price are numbers
    const sanitizedItems = items.map(item => ({
      ...item,
      quantity: item.quantity || 1,
      price: Number(item.price) || 0
    }));

    setSelectedItems(sanitizedItems);
    setTotalPrice(total);
  }, [state.user, navigate, location.state]);

  if (!selectedItems.length) return null;

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
          <CheckoutForm
            totalPrice={totalPrice}
            userName={userName}
            user={state.user}
            selectedItems={selectedItems}
          />
        </Elements>

        <Button
          variant="outlined"
          onClick={() => navigate("/cart")}
          sx={{ marginTop: "10px" }}
        >
          Back to Cart
        </Button>
      </div>
    </Layout>
  );
};

export default PaymentPage;
