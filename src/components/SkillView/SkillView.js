import React, { useEffect, useState } from "react";
// import { getTodaysDate } from ".../util/getTodaysDate";
// import { currentLevel, getCurrentBar } from ".../util/expToLevel";
import LinePlot from "../LinePlot";
import "./SkillView.css"; // Import the CSS file
import { getTodaysDate } from "../../util/getTodaysDate";
import { currentLevel, getCurrentBar } from "../../util/expToLevel";
import ProgressBar from "../ProgressBar";
import ToolTip from "../ToolTip";

const SkillView = () => {
  const [skill, setSkill] = useState(null);
  const [showEditName, setShowEditName] = useState(false);
  const [editName, setEditName] = useState("");
  const skillId = window.location.href.split("/skills/")[1];
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const [addExpDate, setAddExpDate] = useState(getTodaysDate());
  const [refresh, setRefresh] = useState(getTodaysDate());
  const [addExpLength, setAddExpLength] = useState(0);
  const [addExpFocus, setAddExpFocus] = useState(1);

  const [addGoalInfo, setAddGoalInfo] = useState("");
  const [addGoalStartDate, setAddGoalStartDate] = useState(getTodaysDate());
  const [addGoalDeadLine, setAddGoalDeadLine] = useState(getTodaysDate());

  const [totalTime, setTotalTime] = useState(0);
  const [totalExp, setTotalExp] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  const [averageFocus, setAverageFocus] = useState(0);

  const [totalExpGraph, setTotalExpGraph] = useState([]);
  const [expSmaLength, setExpSmaLength] = useState(7);

  const [expGraph, setExpGraph] = useState();

  async function handleEditNameSubmit() {
    let newSkill = skill;
    newSkill.name = editName;

    await fetch("/api/v1/skills", {
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(newSkill),
      method: "put",
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    });
    setRefresh(true);
  }

  useEffect(() => {
    async function fetchData() {
      if (refresh) {
        await fetch(`/api/v1/skills/${skillId}`, {
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + jwt,
          },
          method: "GET",
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
          })
          .then((skillData) => {
            setSkill(skillData);
          });
        setRefresh(false);
      }
    }
    fetchData();
  }, [refresh, skillId, jwt]);

  useEffect(() => {
    let tempTotalGraph = [];

    if (skill && skill.expEntries.length > 0) {
      // setExpGraph(skill.expEntries);
      let tempExp = skill.expEntries;
      let timeSum = 0;
      let focusSum = 0;
      for (let i = 0; i < tempExp.length; i++) {
        //calculate SMA
        let count = 0;
        let sum = 0;
        let sumFocus = 0;
        for (let j = i - expSmaLength; j <= i; j++) {
          if (j >= 0) {
            count++;
            sumFocus += tempExp[j].focus;
            sum += tempExp[j].exp;
          }
        }
        let average = sum / count;
        let averageFocus = sumFocus / count;
        tempExp[i].sma = average;
        tempExp[i].focusSma = averageFocus;

        //Calcualte total exp graph
        if (i === 0) {
          tempTotalGraph.push({
            exp: skill.expEntries[i].exp,
            timeEntry: skill.expEntries[i].timeEntry,
          });
        } else {
          tempTotalGraph.push({
            exp: tempTotalGraph[i - 1].exp + skill.expEntries[i].exp,
            timeEntry: skill.expEntries[0].timeEntry,
          });
        }
        focusSum += tempExp[i].focus;
        timeSum += tempExp[i].hours;
      }
      setRefresh(true);
      setExpGraph(tempExp);
      setTotalExpGraph(tempTotalGraph);

      setTotalExp(tempTotalGraph[tempTotalGraph.length - 1].exp);
      setTotalTime(timeSum);
      setAverageTime(timeSum / tempExp.length);
      setAverageFocus(focusSum / tempExp.length);
    }
  }, [skill, expSmaLength]);

  async function handleDeleteEntry(id) {
    var tempSkill = skill;
    tempSkill.expEntries = tempSkill.expEntries.filter((expEntry) => {
      return expEntry.id !== Number(id);
    });

    await fetch("/api/v1/skills", {
      headers: {
        "Content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(tempSkill),
    }).then(() => {
      setTimeout(() => {
        fetch("/api/v1/expentries/" + id, {
          method: "DELETE",
        });
        setRefresh(true);
      }, 500);
    });
  }

  async function handleAddExp() {
    if (addExpLength !== 0 && addExpFocus > 0) {
      // the base exp per hour will be 100
      const addExpValue = addExpLength * 50 * (addExpFocus / 2);

      await fetch("/api/v1/expentries", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          hours: addExpLength,
          focus: addExpFocus,
          exp: addExpValue,
          timeEntry: addExpDate,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then(async (expEntry) => {
          skill.expEntries.push(expEntry);
          await fetch("/api/v1/skills", {
            headers: {
              "Content-type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(skill),
          });
          setRefresh(true);
        });
    }
  }

  async function handleAddGoal() {
    await fetch("/api/v1/goals", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        goal: addGoalInfo,
        deadLine: addGoalDeadLine,
        startDate: addGoalStartDate,
        complete: false,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(async (goal) => {
        skill.goals.push(goal);
        await fetch("/api/v1/skills", {
          headers: {
            "Content-type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(skill),
        });
        setRefresh(true);
      });
  }

  async function handleDeleteGoal(e) {
    var tempSkill = skill;
    tempSkill.goals = tempSkill.goals.filter((goal) => {
      return goal.id !== Number(e.target.id);
    });

    await fetch("/api/v1/skills", {
      headers: {
        "Content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(tempSkill),
    }).then(async () => {
      await fetch("/api/v1/goals/" + e.target.id, {
        method: "DELETE",
      });
      setRefresh(true);
    });
  }

  async function handleGoalChange(e) {
    var tempGoal = skill.goals.find((goal) => "" + goal.id === e.target.id);

    if (tempGoal.complete) {
      tempGoal.complete = false;
      tempGoal.endDate = undefined;
    } else {
      tempGoal.complete = true;
      tempGoal.endDate = getTodaysDate();
    }

    await fetch("/api/v1/goals", {
      headers: {
        "Content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(tempGoal),
    }).then(() => {
      setRefresh(true);
    });
  }

  var level = 0;
  var max = 0;

  if (skill) {
    level = parseInt(currentLevel(skill.exp, 100, 1.2), 10);
    var currentBarReturn = getCurrentBar(level, 100, 1.2, skill.exp);
    var currentBar = currentBarReturn[0];
    max = currentBarReturn[1];
  }

  const round = (round) => {
    return Math.floor(round * 100) / 100;
  };

  return (
    <div className="skill-view-container">
      {skill ? (
        <>
          <div className="compo exp-bar">
            <h2>
              {skill.name} [{level}]
            </h2>
            <ProgressBar current={currentBar} max={max} />
            <br />
            <button
              onClick={() => {
                setShowEditName(!showEditName);
              }}
            >
              Edit skill name
            </button>
            {showEditName ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button
                  onClick={() => {
                    handleEditNameSubmit();
                  }}
                >
                  Update
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="main-container">
            <div className="main-left">
              <div className="compo">
                <h4>Stats</h4>
                <hr />
                <p>Average time: {round(averageTime)}h</p>
                <p>Average focus: {round(averageFocus)}</p>
                <p>Total time: {round(totalTime)}</p>
                <p>Total EXP: {totalExp}</p>
                <ToolTip
                  tooltip={
                    "Some stats for the nerds ans some more about somethihng"
                  }
                />
              </div>
              <div className="compo">
                <h4>Goals:</h4>
                <hr />
                <div className="goal-table-container">
                  <table>
                    <tr>
                      <th>Goal</th>
                      <th>Deadline</th>
                      <th>Start Date</th>
                      <th>Complete Date</th>
                      <th>Status</th>
                      <th>Delete</th>
                    </tr>
                    {skill.goals.map((goal) => {
                      return (
                        <tr key={goal.id}>
                          {goal.complete ? (
                            <>
                              <td>
                                <s>{goal.goal}</s>
                              </td>
                              <td>{goal.deadLine}</td>
                              <td>{goal.startDate}</td>
                              <td>{goal.endDate}</td>
                              <td>
                                <button
                                  id={goal.id}
                                  onClick={(e) => {
                                    handleGoalChange(e);
                                  }}
                                >
                                  UNCOMPLETE
                                </button>
                              </td>
                              <td>
                                <button
                                  id={goal.id}
                                  onClick={(e) => {
                                    handleDeleteGoal(e);
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{goal.goal}</td>
                              <td>{goal.deadLine}</td>
                              <td>{goal.startDate}</td>
                              <td>{goal.endDate}</td>
                              <td>
                                <button
                                  id={goal.id}
                                  onClick={(e) => {
                                    handleGoalChange(e);
                                  }}
                                >
                                  COMPLETED!
                                </button>
                              </td>
                              <td>
                                <button
                                  id={goal.id}
                                  onClick={(e) => {
                                    handleDeleteGoal(e);
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </table>
                </div>
                <br />
                <h5>Add new goal</h5>
                <hr />
                <label htmlFor="goal-name">Goal:</label>
                <input
                  id="goal-name"
                  className="goal-text-box"
                  type="text"
                  value={addGoalInfo}
                  onChange={(e) => {
                    setAddGoalInfo(e.target.value);
                  }}
                />
                <br />
                <label htmlFor="start-date">Start date:</label>
                <input
                  id="start-date"
                  type="date"
                  value={addGoalStartDate}
                  onChange={(e) => {
                    setAddGoalStartDate(e.target.value);
                  }}
                />
                <br />
                <label htmlFor="deadline">DeadLine:</label>
                <input
                  id="deadline"
                  type="date"
                  value={addGoalDeadLine}
                  onChange={(e) => {
                    setAddGoalDeadLine(e.target.value);
                  }}
                />
                <br />
                <button
                  onClick={() => {
                    handleAddGoal();
                  }}
                >
                  Add new goal
                </button>
                <ToolTip
                  tooltip={
                    "Set goals and tick them off the list when completed."
                  }
                />
              </div>

              <div className="compo">
                <h4>Exp Entries</h4>
                <hr />
                <h6>Add new experience </h6>
                <label htmlFor="add-exp-hours">
                  How many hours did you put in?
                </label>
                <input
                  id="add-exp-hours"
                  type="number"
                  min={0}
                  value={addExpLength}
                  onChange={(e) => {
                    setAddExpLength(e.target.value);
                  }}
                />
                <br />
                <label htmlFor="add-exp-focus">
                  How focused were you? (1-5)
                </label>
                <input
                  id="add-exp-focus"
                  type="number"
                  min={1}
                  max={5}
                  value={addExpFocus}
                  onChange={(e) => {
                    setAddExpFocus(e.target.value);
                  }}
                />
                <br />
                <label htmlFor="add-exp-date">Date:</label>
                <input
                  id="add-exp-date"
                  type="date"
                  value={addExpDate}
                  onChange={(e) => {
                    setAddExpDate(e.target.value);
                  }}
                />
                <br />
                <button
                  onClick={() => {
                    handleAddExp();
                  }}
                >
                  Add Exp
                </button>
                <div className="entries-window">
                  <table>
                    <tr>
                      <th>Date</th>
                      <th>EXP</th>
                      <th>Delete</th>
                    </tr>
                    {skill.expEntries.map((entry, id) => {
                      return (
                        <tr key={id}>
                          <td>{entry.timeEntry}</td>
                          <td>{entry.exp}</td>
                          <td>
                            <button onClick={() => handleDeleteEntry(entry.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
                <ToolTip
                  tooltip={
                    "Add new experiences. View and edit past experiences."
                  }
                />
              </div>
            </div>
            <div className="main-right">
              <div className="compo">
                <h4>Line Plots</h4>
                <hr />
                EXP SMA LENGTH
                <input
                  min={1}
                  value={expSmaLength}
                  type="number"
                  onChange={(e) => {
                    setExpSmaLength(e.target.value);
                  }}
                />
                <ToolTip
                  tooltip={
                    "Adjust the purple lines in the graphs below. (purple line is the average for the last specified days)"
                  }
                />
              </div>
              <div className="compo">
                <h4>EXP plot</h4>
                <hr />
                <LinePlot data={expGraph} dataName={"exp"} smaName={"sma"} />
                <ToolTip
                  tooltip={
                    "This is the plot of all the exp entries for this skill. Purple line is the moving average."
                  }
                />
              </div>
              <div className="compo">
                <h4>Focus plot</h4>
                <hr />
                <LinePlot
                  data={expGraph}
                  dataName={"focus"}
                  smaName={"focusSma"}
                />
                <ToolTip
                  tooltip={
                    "This is the plot of all focus entries for this skill. The line shows how in some periods you can be more focused than others."
                  }
                />
              </div>
              <div className="compo">
                <h4>Total EXP plot</h4>
                <hr />
                <LinePlot
                  data={totalExpGraph}
                  dataName={"exp"}
                  smaName={"sma"}
                />
                <ToolTip
                  tooltip={
                    "This is the total amount of EXP that you have gained."
                  }
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>No skill found</>
      )}
    </div>
  );
};

export default SkillView;
