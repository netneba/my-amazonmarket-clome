import React, { useState } from "react";
import { Rating, Button } from "@mui/material";
import CurrencyFormatter from "./CurrencyFormatter";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import DotLoader from "../DotLoader/DotLoader";
import { useCart } from "../Utility/CartContext";
import { ACTIONS } from "../Utility/cartReducer";

const ProductCard = ({ id, title, price, rating, image }) => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Stop Link click
    e.preventDefault();  // Prevent navigation
    const product = { id, title, price, image };
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };

  return loading ? (
    <div className={styles.loaderWrapper}>
      <DotLoader loading={loading} size={50} color="#36d7b7" />
    </div>
  ) : (
    <div className={styles.card}>
      {/* Card Link */}
      <Link to={`/product/${id}`} className={styles.link}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} />
        </div>

        {/* Title */}
        <div className={styles.title}>{title}</div>

        {/* Rating */}
        <div className={styles.rating}>
          <Rating
            value={typeof rating === "number" ? rating : rating?.rate || 0}
            precision={0.1}
            readOnly
          />
        </div>

        {/* Price */}
        <div className={styles.price}>
          <CurrencyFormatter value={price} />
        </div>
      </Link>

     
      <div className={styles.buttonWrapper}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f0c14b",
            color: "#111",
            "&:hover": { backgroundColor: "#ddb347" },
          }}
          fullWidth
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
