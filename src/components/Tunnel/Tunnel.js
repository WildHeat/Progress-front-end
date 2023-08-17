import React, { useEffect, useState } from "react";
import "./Tunnel.css";

const Tunnel = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const circleStyle = {
    transform: `translate(${mousePosition.x / 50}px, ${
      mousePosition.y / 50
    }px) scale(1.5)`,
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const divRect = event.target.getBoundingClientRect();
    const centerX = divRect.width / 2;
    const centerY = divRect.height / 2;
    const offsetX = clientX - divRect.left - centerX;
    const offsetY = clientY - divRect.top - centerY;

    setMousePosition({ x: offsetX, y: offsetY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div className="tunnel-container">
      <div className="center-container">
        <div className="circle red-circle most-inner" style={circleStyle}>
          <div className="circle white-circle inner" style={circleStyle}>
            <div className="circle red-circle outer" style={circleStyle}>
              <div
                className="circle white-circle most-outer"
                style={circleStyle}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tunnel;
