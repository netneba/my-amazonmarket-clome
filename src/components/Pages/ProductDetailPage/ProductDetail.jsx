import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Rating, Button, Typography } from "@mui/material";
import CurrencyFormatter from "../../ProductSection/CurrencyFormatter";
import Layout from "../../Layout/Layout";
import styles from "./ProductDetail.module.css";
import DotLoader from "../../DotLoader/DotLoader";
import { useCart } from "../../Utility/CartContext.jsx"; 
import { ACTIONS } from "../../Utility/actions.js";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: ACTIONS.ADD_TO_CART,
        payload: {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        },
      });
    }
  };

  return (
    <Layout>
      {loading ? (
        <DotLoader loading={loading} size={80} color="#36d7b7" />
      ) : !product ? (
        <Typography variant="h6" align="center" mt={4}>
          Product not found
        </Typography>
      ) : (
        <div className={styles.container}>
          {/* Product Image */}
          <div className={styles.imageWrapper}>
            <img src={product.image} alt={product.title} />
          </div>

          {/* Product Info */}
          <div className={styles.infoWrapper}>
            <Typography className={styles.title}>{product.title}</Typography>

            <Typography className={styles.price}>
              <CurrencyFormatter value={product.price} />
            </Typography>

            <Typography className={styles.category}>
              Category: {product.category}
            </Typography>

            <Typography className={styles.description}>
              {product.description}
            </Typography>

            <div className={styles.ratingWrapper}>
              <Rating value={product.rating?.rate || 0} precision={0.1} />
              <span>
                {product.rating?.rate} ({product.rating?.count} reviews)
              </span>
            </div>

            <div className={styles.buttonGroup}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#f0c14b",
                  color: "#111",
                  "&:hover": { backgroundColor: "#ddb347" },
                }}
                onClick={handleAddToCart} 
              >
                Add to Cart
              </Button>

              <div className={styles.backButton} onClick={() => navigate(-1)}>
                ←
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetail;
