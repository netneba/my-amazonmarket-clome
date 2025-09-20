import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { useCart } from "../../Utility/CartContext";
import { ACTIONS } from "../../Utility/actions";
import CurrencyFormatter from "../../ProductSection/CurrencyFormatter";
import DotLoader from "../../DotLoader/DotLoader";
import styles from "./CategoryPage.module.css";

const endPoint = "https://fakestoreapi.com";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { dispatch } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${endPoint}/products/category/${encodeURIComponent(categoryName)}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  const handleAddToCart = (product) => {
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
    });
    dispatch({
      type: ACTIONS.SELECT_ITEMS,
      payload: { [product.id]: true },
    });
  };

  return (
    <Layout>
      <h1 className={styles.title}>Results: {categoryName}</h1>
      {loading ? (
        <DotLoader loading={loading} size={80} color="#36d7b7" />
      ) : products.length === 0 ? (
        <p className={styles.noProducts}>No products found in this category.</p>
      ) : (
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div
              key={product.id}
              className={styles.card}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={product.image}
                alt={product.title}
                className={styles.image}
              />
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.price}>
                <CurrencyFormatter value={product.price} />
              </p>
              {hovered === product.id && (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#f0c14b",
                    color: "#111",
                    "&:hover": { backgroundColor: "#ddb347" },
                    marginTop: "8px",
                  }}
                  fullWidth
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default CategoryPage;
