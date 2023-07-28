import React from "react";
import { Link } from "react-router-dom";
import { currentLevel, expForLevel, getCurrentBar } from "../util/expToLevel";

const Skill = ({ skill, exp, skillId }) => {
  const level = parseInt(currentLevel(exp, 100, 1.2), 10);
  var currentBarReturn = getCurrentBar(level, 100, 1.2, exp);
  var currentBar = currentBarReturn[0];
  var max = currentBarReturn[1];
  // var currentLevelExp = expForLevel(level, 100, 1.2);
  var nextLevelExp = expForLevel(level + 1, 100, 1.2);
  // var max = nextLevelExp - currentLevelExp;
  // var currentBar = exp - currentLevelExp;

  return (
    <div className="skill-box-content">
      <h3>
        <Link to={"/skills/" + skillId}>{skill}</Link>
      </h3>
      <p>Level: {level}</p>
      <div className="progress-container">
        <div
          className="progress progress-bar-striped"
          role="progressbar"
          style={{ width: currentBar / max }}
          aria-valuenow="10"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span>
            {exp}/{parseInt(nextLevelExp)}
          </span>
        </div>
      </div>
      <progress value={currentBar} max={max}></progress>
      EXP: {exp}/{parseInt(nextLevelExp)}
    </div>
  );
};

export default Skill;
