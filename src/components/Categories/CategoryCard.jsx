import React from "react";
import styles from "./CategoryCard.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../Utility/CartContext.jsx"; // ✅ import cart context
import { ACTIONS } from "../Utility/cartReducer.jsx";
import { Button } from "@mui/material";

const CategoryCard = ({ data }) => {
  const { dispatch } = useCart(); // get dispatch from context

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent link navigation if needed
    const product = {
      id: data?.id || data?.title, // fallback if id not available
      title: data?.title,
      price: data?.price || 0, // if you have a price field
      image: data?.image,
    };
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };

  return (
    <div className={styles.card}>
      <Link
        to={`/category/${encodeURIComponent(data?.apiTitle)}`}
        className={styles.link}
      >
        <span className={styles.title}>{data?.title}</span>
        <img src={data?.image} alt={data?.title} className={styles.image} />
        Shop now
      </Link>

      {/* Optional Add to Cart button */}
      {data?.price && ( // only show if price exists
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f0c14b",
            color: "#111",
            "&:hover": { backgroundColor: "#ddb347" },
            marginTop: "8px",
            width: "100%",
          }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default CategoryCard;
