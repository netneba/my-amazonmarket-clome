import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { useParams } from "react-router-dom";
import styles from './CategoryPage.module.css';
import axios from 'axios';
import { endPoint } from '../../../Api/endPoint';
import DotLoader from '../../DotLoader/DotLoader';
import { useCart } from '../../Utility/CartContext.jsx';
import { ACTIONS } from '../../Utility/cartReducer.jsx';
import { Button } from '@mui/material';
import CurrencyFormatter from '../../ProductSection/CurrencyFormatter';

const CategoryPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { categoryName } = useParams();
    const { dispatch } = useCart();
    const [hovered, setHovered] = useState(null); // Track hovered product id

    useEffect(() => {
        setLoading(true);
        axios.get(`${endPoint}/products/category/${categoryName}`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
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
    };

    return (
        <Layout>
            <h1 className={styles.title}>
                Results: {categoryName}
            </h1>

            {loading ? (
                <DotLoader loading={loading} size={80} color="#36d7b7" />
            ) : products.length === 0 ? (
                <p className={styles.noProducts}>No products found in this category.</p>
            ) : (
                <div className={styles.productsGrid}>
                    {products.map(product => (
                        <div
                            key={product.id}
                            className={styles.card}
                            onMouseEnter={() => setHovered(product.id)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <img src={product.image} alt={product.title} className={styles.image} />
                            <h3 className={styles.productTitle}>{product.title}</h3>
                            <p className={styles.price}>
                                <CurrencyFormatter value={product.price} />
                            </p>

                            {/* Show button only when hovered */}
                            {hovered === product.id && (
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#f0c14b",
                                        color: "#111",
                                        "&:hover": { backgroundColor: "#ddb347" },
                                        marginTop: '8px',
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
