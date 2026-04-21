import React, { useState, useEffect, useRef } from "react";
import "../cssFiles/carousel.css";

import img1 from "../Assets/CarouselW.png";
import img2 from "../Assets/cor1.jpg";
import img3 from "../Assets/carouselZ.webp";
import img4 from "../Assets/CarouselX.webp";
import img5 from "../Assets/CarouselY.avif";

function Carousel() {
  const images = [img1, img2, img3, img4, img5];

  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  // Auto Slide
  useEffect(() => {
    startAutoSlide();

    return () => clearInterval(intervalRef.current);
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 4000);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    startAutoSlide();
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    nextSlide();
    resetTimer();
  };

  const handlePrev = () => {
    prevSlide();
    resetTimer();
  };

  const goToSlide = (i) => {
    setIndex(i);
    resetTimer();
  };

  return (
    <section className="carousel-section">
      <div className="carousel-container">
        {/* Slides */}
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {images.map((img, i) => (
            <div className="slide" key={i}>
              <img src={img} alt={`banner-${i}`} className="slide-img" />

              {/* <div className="overlay">
                <h1>Welcome to FaceKYC Platform</h1>
                <p>Secure, Fast & Professional Verification System</p>
                <button>Explore More</button>
              </div> */}
              
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button className="nav-btn prev" onClick={handlePrev}>
          ❮
        </button>

        <button className="nav-btn next" onClick={handleNext}>
          ❯
        </button>

        {/* Dots */}
        <div className="dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={index === i ? "dot active" : "dot"}
              onClick={() => goToSlide(i)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Carousel;