import React from "react";
import styles from "./CategoryCard.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../Utility/CartContext";
import { ACTIONS } from "../Utility/actions";
import { Button } from "@mui/material";

const CategoryCard = ({ data }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    const product = {
      id: data?.id || data?.title,
      title: data?.title,
      price: data?.price || 0,
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

      {data?.price && (
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
