import React, { useEffect, useState } from "react";

const ProgressBar = ({ max, current }) => {
  const [percent, setPecent] = useState(1);

  useEffect(() => {
    setPecent((Math.floor(current) / Math.floor(max)) * 100);
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
