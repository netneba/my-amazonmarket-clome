import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";

const ProductSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Grid container justifyContent="center" spacing={2}>
  {products.map((p) => (
    <Grid key={p.id} item xs={12} sm={6} md={4} lg={3}>
      <ProductCard
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


























// import React from "react";
// import { productData } from "./productData";
// import ProductCard from "./ProductCard";
// import styles from "./Product.module.css";

// const ProductSection = () => {
//   return (
//     <div className={styles.container}>
//       {productData.map((p) => (
//         <ProductCard
//           key={p.id}
//           title={p.title}
//           price={p.price}
//           rating={p.rating}
//           image={p.image}
//         />
//       ))}
//     </div>
//   );
// };

// export default ProductSection;
