import React, { useEffect, useState } from "react";
import { currentLevel, getCurrentBar } from "../../util/expToLevel";
import ProgressBar from "../ProgressBar";

function ProfileSection(props) {
  const [level, setLevel] = useState(0);
  const [max, setMax] = useState(2);
  const [currentBar, setCurrentBar] = useState();
  const [statTotalTime, setStatTotalTime] = useState(0);
  const [characterTotalExp, setCharacterTotalExp] = useState(0);
  const user = props.user;
  const [progressBarIsReady, setProgressBarIsReady] = useState(false);

  useEffect(() => {
    if (user && user.skills.length !== 0) {
      var totalExp = 0;
      var totalTime = 0;
      user.skills.forEach((skill) => {
        skill.expEntries.forEach((entry) => {
          totalExp += entry.hours * 50 * (entry.focus / 2);
          totalTime += entry.hours;
        });
      });
      setStatTotalTime(totalTime);
      setCharacterTotalExp(totalExp);
      setLevel(parseInt(currentLevel(totalExp, 300, 1.5), 10));
      var currentBarReturn = getCurrentBar(level, 300, 1.5, totalExp);
      console.log("Current bar" + currentBar);
      console.log("Max" + max);
      setCurrentBar(currentBarReturn[0]);
      setMax(currentBarReturn[1]);
      setProgressBarIsReady(true);
    }
  }, [currentBar, level, max, user]);

  return (
    <div className="home-page-profile-container">
      <div className="character-name-container">
        <h3 className="character-statistic">
          {user.username} - Level {level}
        </h3>
      </div>
      <div className="profile-container">
        <div className="characterinfo">
          <img
            className="characterIcon"
            src={require("../../img/icon1.jpg")}
            alt="Character Icon"
          />
        </div>
        <div className="profile-stats">
          <p className="character-statistic">
            Total time training: {statTotalTime}
          </p>
          <p className="character-statistic">
            Total exp gained: {characterTotalExp}
          </p>
        </div>
      </div>
      {progressBarIsReady ? (
        <div className="profile-progress-bar-container">
          <ProgressBar current={currentBar} max={max} />
        </div>
      ) : (
        <>Loading {max}</>
      )}

      <hr />
    </div>
  );
}

export default ProfileSection;
