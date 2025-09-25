import React, { useEffect, useState } from "react";
import { useCart } from "../../Utility/CartContext";
import Layout from "../../Layout/Layout";
import { db } from "../../Utility/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import CurrencyFormatter from "../../ProductSection/CurrencyFormatter";
import styles from "./OrderPage.module.css";

const OrderPage = () => {
  const { state } = useCart();
  const user = state.user;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const ordersRef = collection(db, "users", user.uid, "orders");
        const q = query(ordersRef, orderBy("created", "desc"));
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (err) {
        console.error("Error fetching orders: ", err);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (loading)
    return (
      <Layout>
        <p className={styles.info}>Loading orders...</p>
      </Layout>
    );

  return (
    <Layout>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p className={styles.info}>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Status:</strong> {order.status || "Unknown"}
            </p>
            <p>
              <strong>Total:</strong>{" "}
              <CurrencyFormatter value={order.amount} />
            </p>
            <p>
              <strong>Items:</strong>
            </p>
            <ul className={styles.itemsList}>
              {order.items.map((item) => (
                <li key={item.id} className={styles.itemRow}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfo}>
                    <p>{item.title}</p>
                    <p>
                      Qty: {item.quantity} ×{" "}
                      <CurrencyFormatter value={item.price} />
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p>
              <strong>Created:</strong>{" "}
              {order.created?.toDate?.()?.toLocaleString() || "N/A"}
            </p>
          </div>
        ))
      )}
    </Layout>
  );
};

export default OrderPage;
