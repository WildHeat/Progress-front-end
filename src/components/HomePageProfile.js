import React, { useEffect, useState } from "react";
import { currentLevel, getCurrentBar } from "../util/expToLevel";

function HomePageProfile(props) {
  const [level, setLevel] = useState(2);
  const [max, setMax] = useState(0);
  const [currentBar, setCurrentBar] = useState(0);
  const user = props.user;

  useEffect(() => {
    if (user && user.skills.length !== 0) {
      var totalExp = 0;
      user.skills.forEach((skill) => {
        totalExp += skill.exp;
      });
      console.log(totalExp);
      setLevel(parseInt(currentLevel(totalExp, 300, 1.5), 10));
      var currentBarReturn = getCurrentBar(level, 300, 1.5, totalExp);
      setCurrentBar(currentBarReturn[0]);
      setMax(currentBarReturn[1]);
    }
  }, [user, level]);

  return (
    <div className="home-page-profile-container">
      <div className="character-name-container">
        <h3>
          {user.username} - Level {level}
        </h3>
      </div>
      <div className="profile-container">
        <div className="characterinfo">
          <img
            className="characterIcon"
            src={require("../img/icon1.jpg")}
            alt="Character Icon"
          />
        </div>
        <div className="profileStats">
          <p>Total time training: 202h</p>
          <p>Exp to level level: 342</p>
          <p>Max exp: 23423</p>
        </div>
      </div>
      <div className="profile-progress-bar-container">
        <progress
          className="profile-progress-bar"
          value={currentBar}
          max={max}
        ></progress>
      </div>
      <hr />
    </div>
  );
}

export default HomePageProfile;
