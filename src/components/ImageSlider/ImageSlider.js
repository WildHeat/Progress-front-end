import React, { useState } from "react";
import "./ImageSlider.css";

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const slideStyle = {
    backgroundImage: `url(${slides[currentIndex].url})`,
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div className="image-slidshow-container">
      <div className="left-arrow arrow" onClick={previousSlide}>
        ⇽
      </div>
      <div className="right-arrow arrow" onClick={nextSlide}>
        ⇾
      </div>
      <div style={slideStyle} className="slide"></div>
      <div className="dots-container">
        {slides.map((slide, index) => {
          return (
            <div
              className="slide-show-dot"
              key={index}
              onClick={() => setCurrentIndex(index)}
            >
              {currentIndex === index ? "⚫" : "◯"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;
