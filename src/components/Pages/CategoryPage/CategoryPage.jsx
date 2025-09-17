import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { useParams } from "react-router-dom";
import styles from './CategoryPage.module.css';
import axios from 'axios';
import { endPoint } from '../../../Api/endPoint';

const CategoryPage = () => {
    const [products, setProducts] = useState([]);
    const { categoryName } = useParams();

    useEffect(() => {
        // Fetch products when category changes
        axios.get(`${endPoint}/products/category/${categoryName}`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));

    }, [categoryName]);

    return (
        <Layout>
            <h1 className={styles.title}>Results
             {categoryName}</h1>
            <div className={styles.productsGrid}>
                {products.map(product => (
                    <div key={product.id} className={styles.card}>
                        <img src={product.image} alt={product.title} className={styles.image} />
                        <h3 className={styles.productTitle}>{product.title}</h3>
                        <p className={styles.price}>${product.price}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default CategoryPage;
