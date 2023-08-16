import React, { useEffect, useState } from "react";
import { currentLevel, getCurrentBar } from "../util/expToLevel";
import ProgressBar from "./ProgressBar";

function HomePageProfile(props) {
  const [level, setLevel] = useState(2);
  const [max, setMax] = useState(0);
  const [currentBar, setCurrentBar] = useState(0);
  const [statTotalTime, setStatTotalTime] = useState(0);
  const [characterTotalExp, setCharacterTotalExp] = useState(0);
  const [displaySKills, setDisplaySkills] = useState([]);
  const user = props.user;

  useEffect(() => {
    if (user && user.skills.length !== 0) {
      var totalExp = 0;
      var totalTime = 0;
      user.skills.forEach((skill) => {
        totalExp += skill.exp;
        skill.expEntries.forEach((entry) => {
          totalTime += entry.hours;
        });
      });
      setStatTotalTime(totalTime);
      setCharacterTotalExp(totalExp);
      setLevel(parseInt(currentLevel(totalExp, 300, 1.5), 10));
      var currentBarReturn = getCurrentBar(level, 300, 1.5, totalExp);
      setCurrentBar(currentBarReturn[0]);
      setMax(currentBarReturn[1]);

      let tempDisplaySkills = [];

      tempDisplaySkills.push(
        <h3 className="first-three-skills">
          <span>Skill</span> <span>Level</span>
        </h3>
      );

      for (let i = 0; i < user.skills.length && i !== 3; i++) {
        tempDisplaySkills.push(
          <h4 key={i} className="first-three-skills">
            <span className="skill-name">{user.skills[i].name}</span>
            <span>
              {parseInt(currentLevel(user.skills[i].exp, 100, 1.2), 10)}
            </span>
          </h4>
        );
      }

      setDisplaySkills(tempDisplaySkills);

      // display first 3 skills if they exist
    }
  }, [user, level, statTotalTime]);

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
            src={require("../img/icon1.jpg")}
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
      <div className="profile-progress-bar-container">
        <ProgressBar current={currentBar} max={max} />
      </div>
      <hr />
    </div>
  );
}

export default HomePageProfile;
