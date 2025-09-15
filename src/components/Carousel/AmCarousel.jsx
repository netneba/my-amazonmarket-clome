import React from "react";
import {
  Carousel as ResponsiveCarousel, 
} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { carouselData } from "./data"; 
import styles from "./Carousel.module.css";

const AmCarousel = () => {
  return (
    <div className={styles.carouselWrapper}>
      <ResponsiveCarousel
        autoPlay
        infiniteLoop
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        interval={3500}
        swipeable
        emulateTouch
        stopOnHover
      >
        {carouselData.map((imgSrc, index) => (
          <div key={index}>
            <img
              src={imgSrc}
              alt={`Banner ${index + 1}`}
            g  className={styles.carouselImage}
            />
          </div>
        ))}
      </ResponsiveCarousel>
    </div>
  );
};

export default AmCarousel;
