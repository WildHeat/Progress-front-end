import React from "react";
import { Link } from "react-router-dom";
import { currentLevel, expForLevel, getCurrentBar } from "../util/expToLevel";

const Skill = ({ skill, exp, skillId }) => {
  const level = parseInt(currentLevel(exp, 100, 1.2), 10);
  var currentBarReturn = getCurrentBar(level, 100, 1.2, exp);
  var currentBar = currentBarReturn[0];
  var max = currentBarReturn[1];
  // var currentLevelExp = expForLevel(level, 100, 1.2);
  // var nextLevelExp = expForLevel(level + 1, 100, 1.2);
  // var max = nextLevelExp - currentLevelExp;
  // var currentBar = exp - currentLevelExp;

  return (
    <div>
      <h3>
        <Link to={"/skills/" + skillId}>
          {skill} - {skillId}
        </Link>
      </h3>
      <div className="w-25 border border-primary mx-5 my-3">
        <p>Level: {level}</p>
        <p>EXP: {exp}</p>
        <progress value={currentBar} max={max}></progress>
        {/* <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow="70"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span className="sr-only">....35%...</span>
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default Skill;
