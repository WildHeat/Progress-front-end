import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ImageSlider.css";

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const previousSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      nextSlide();
    }, 4000);

    //to not have memory leaks
    return () => clearTimeout(timerRef.current);
  }, [nextSlide]);

  const slideStyle = {
    backgroundImage: `url(${slides[currentIndex].url})`,
    width: "100%",
    height: "100%",
    border: "solid 0.5px black",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div className="image-slidshow-container">
      <h3>{slides[currentIndex].title}</h3>
      <div style={slideStyle} className="slide"></div>
      <div className="dots-container">
        <div className="left-arrow arrow" onClick={previousSlide}>
          ⇽
        </div>
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
        <div className="right-arrow arrow" onClick={nextSlide}>
          ⇾
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
