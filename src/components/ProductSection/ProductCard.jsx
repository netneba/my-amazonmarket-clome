import React from "react";
import { Rating, Button } from "@mui/material";
import CurrencyFormatter from "./CurrencyFormatter";
import styles from "./ProductCard.module.css";

const ProductCard = ({ title, price, rating, image }) => {
  return (
    <div className={styles.card}>
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
        />
      </div>

      {/* Price */}
      <div className={styles.price}>
        <CurrencyFormatter value={price} />
      </div>

      {/* Button */}
      <div className={styles.buttonWrapper}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f0c14b",
            color: "#111",
            "&:hover": { backgroundColor: "#ddb347" },
          }}
          fullWidth
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
