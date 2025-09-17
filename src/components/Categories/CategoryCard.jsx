import React from "react";
import styles from "./CategoryCard.module.css";
import { Link } from "react-router-dom";


const CategoryCard = ({ data }) => {
    // console.log(data);
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

     {/* <Link to={`/category/${data?.title}`} className={styles.link}>
     <span className={styles.title}>{data?.title}</span>
      <img src={data?.image} alt={data?.title} className={styles.image} />
      Shop now
        </Link> */}
      {/* <span className={styles.link} onClick={() => (window.location.href = link)}> */}
        
      {/* </span> */}
    </div>
  );
};

export default CategoryCard;
