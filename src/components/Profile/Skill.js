import React from "react";
import { Link } from "react-router-dom";
import {
  currentLevel,
  expForLevel,
  getCurrentBar,
} from "../../util/expToLevel";
import ProgressBar from "../ProgressBar";

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
        <ProgressBar current={currentBar} max={max} />
      </div>
      EXP: {exp}/{parseInt(nextLevelExp)}
    </div>
  );
};

export default Skill;
