import React from "react";

const InfoDeck = () => {
  return (
    <div className="info-deck">
      <div className="card-in-deck hidden">
        Set goals with deadlines and cross them off when you achieved the goal.
        <h2>
          <s>GOALS</s>
        </h2>
      </div>
      <div className="card-in-deck hidden">
        View your progress from a new angle with the use of charts and levels.
      </div>
      <div className="card-in-deck hidden">
        Increase the level of your character to demonstrate the effort and
        progress that you have made.
      </div>
      <div className="card-in-deck hidden">
        Track how focused you are when training your skills.
      </div>
      <div className="card-in-deck hidden">
        Share this information with your friends and family.
      </div>
    </div>
  );
};

export default InfoDeck;
