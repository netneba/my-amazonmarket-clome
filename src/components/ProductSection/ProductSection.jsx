import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";
import DotLoader from "../DotLoader/DotLoader";
import styles from "./Product.module.css"; 

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return loading ? (
    <div className={styles.loaderWrapper}>
      <DotLoader loading={loading} size={50} color="#36d7b7" />
    </div>
  ) : (
    <Grid container justifyContent="center" spacing={2}>
      {products.map((p) => (
        <Grid key={p.id} item xs={12} sm={6} md={4} lg={3}>
          <ProductCard
            id={p.id}
            title={p.title}
            price={p.price}
            rating={p.rating?.rate || 0}
            image={p.image}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductSection;
