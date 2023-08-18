import React, { useEffect, useState } from "react";
import "./Tunnel.css";

const Tunnel = () => {
  const [
    mousePoitionRelativeToCenterCircle,
    setMousePoitionRelativeToCenterCircle,
  ] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    // console.log(event);
    let tunnelElement = document.getElementById("tunnel");
    const divRect = tunnelElement.getBoundingClientRect();
    const { clientX, clientY } = event;
    if (clientY > divRect.top && clientY < divRect.bottom) {
      let centerCircleElement = document.getElementById("center-cirle");
      const centerCircleRect = centerCircleElement.getBoundingClientRect();
      const offset = 150;
      const centerX = clientX - centerCircleRect.left;
      const centerY = clientY - centerCircleRect.top;
      setMousePoitionRelativeToCenterCircle({
        x: centerX - offset,
        y: centerY - offset,
      });
      console.log("X:" + centerX);
      console.log("y:" + centerY);
    }
    // const divRect = event.target.getBoundingClientRect();
    // const centerX = divRect.width / 2;
    // const centerY = divRect.height / 2;
    // const offsetX = clientX - divRect.left - centerX - 125;
    // const offsetY = clientY - divRect.top - centerY - 125;
    // setMousePosition({ x: offsetX, y: offsetY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const circleStyle = {
    transform: `translate(${mousePoitionRelativeToCenterCircle.x / 1000}em, ${
      mousePoitionRelativeToCenterCircle.y / 1000
    }em) scale(1.8)`,
  };

  return (
    <div id="tunnel" className="tunnel-container">
      <div className="center-container">
        <div
          id="center-cirle"
          className="circle red-circle most-inner"
          style={circleStyle}
        >
          <div className="circle white-circle inner" style={circleStyle}>
            <div className="circle red-circle outer" style={circleStyle}>
              <div className="circle white-circle outer" style={circleStyle}>
                <div
                  className="circle red-circle most-outer"
                  style={{ ...circleStyle, border: "solid 3px red" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tunnel;
