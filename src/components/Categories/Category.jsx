import React from "react";
import { catgoriesData } from "./catData";
import CategoryCard from "./CategoryCard";
import styles from "./Category.module.css";
const Category = () => {
  return (
    <div className={styles.container}>
      {catgoriesData.map((cat) => (
        <CategoryCard key={cat.id} data={cat} />
      ))}
    </div>
  );
};

export default Category;
