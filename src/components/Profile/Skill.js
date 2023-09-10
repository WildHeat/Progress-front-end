import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { currentLevel, getCurrentBar } from "../../util/expToLevel";
import ProgressBar from "../ProgressBar";

const Skill = ({ skill, exp, skillId, goals }) => {
  const level = parseInt(currentLevel(exp, 100, 1.2), 10);
  var currentBarReturn = getCurrentBar(level, 100, 1.2, exp);
  var currentBar = currentBarReturn[0];
  var max = currentBarReturn[1];

  var [goalToDisplay, setGoalToDisplay] = useState("");

  useEffect(() => {
    if (goals.length > 0) {
      for (let i = 0; i < goals.length; i++) {
        if (!goals[i].complete) {
          setGoalToDisplay(goals[i].goal);
        }
      }
    }
  }, [goals]);

  return (
    <div className="skill-box-content">
      <h3>
        <Link to={"/skills/" + skillId}>{skill}</Link> [{level}]
      </h3>
      <div className="progress-container">
        <ProgressBar current={currentBar} max={max} />
      </div>
      <div className="skill-box-goal">
        {goalToDisplay !== "" ? "Uncomplete Goal: " + goalToDisplay : ""}
      </div>
    </div>
  );
};

export default Skill;
