import React from "react";
import styles from "./CategoryCard.module.css";

const CategoryCard = ({ title, image, link }) => {
  return (
    <div className={styles.card}>
      <span className={styles.title}>{title}</span>
      <img src={image} alt={title} className={styles.image} />
      <span className={styles.link} onClick={() => (window.location.href = link)}>
        Shop now
      </span>
    </div>
  );
};

export default CategoryCard;
