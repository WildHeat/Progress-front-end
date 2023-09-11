import React from "react";

const InfoDeck = () => {
  return (
    <div className="info-deck">
      <div className="card-in-deck hidden">
        <p>
          Set goals with deadlines and cross them off when you achieved the
          goal.
        </p>
        <div className="card-image-center-container">
          <div className="card-image-container">
            <img
              src={require("../../img/Goal strike through.png")}
              alt="Goal strikethrough"
            />
          </div>
        </div>
      </div>
      <div className="card-in-deck hidden">
        <p>
          View your progress from a new angle with the use of charts and levels.
        </p>
        <div className="card-image-center-container">
          <div className="card-image-container">
            <img src={require("../../img/Chart arrow.png")} alt="chart arrow" />
          </div>
        </div>
      </div>
      <div className="card-in-deck hidden">
        <p>
          Increase the level of your character to demonstrate the effort and
          progress that you have made.
        </p>
        <div className="card-image-center-container">
          <div className="card-image-container">
            <img
              src={require("../../img/level up splash no background.png")}
              alt="level up"
            />
          </div>
        </div>
      </div>
      <div className="card-in-deck hidden">
        <p>Track how focused you are when training your skills.</p>
        <div className="card-image-center-container">
          <div className="card-image-container">
            <img src={require("../../img/target.png")} alt="focus target" />
          </div>
        </div>
      </div>
      <div className="card-in-deck hidden">
        <p>Share this information with your friends and family.</p>
        <div className="card-image-center-container">
          <div className="card-image-container">
            <img
              src={require("../../img/family.png")}
              alt="family and friends"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoDeck;
