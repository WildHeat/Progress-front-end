import React, { useEffect, useState } from "react";

const ProgressBar = ({ max, current }) => {
  const [percent, setPecent] = useState(0);

  useEffect(() => {
    const randomTime = Math.floor(Math.random() * 500);
    setTimeout(() => {
      setPecent((Math.floor(current) / Math.floor(max)) * 100);
    }, 500 + randomTime);
  }, [current, max]);

  return (
    <div className="main-progress-container">
      <p className="progress-exp">EXP</p>
      <div className="progress-outer-container">
        <div
          className="progress-inner-container"
          style={{ width: `${percent}%` }}
        >
          <p>
            {Math.floor(current)} / {Math.floor(max)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
