import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { getTodaysDate } from "../util/getTodaysDate";
import { currentLevel, getCurrentBar } from "../util/expToLevel";
import LinePlot from "./LinePlot";
import "./SkillView.css"; // Import the CSS file

const SkillView = () => {
  const [skill, setSkill] = useState(null);
  const [showEditName, setShowEditName] = useState(false);
  const [editName, setEditName] = useState("");
  const skillId = window.location.href.split("/skills/")[1];
  const [jwt, setJwt] = useLocalState("jwt", "");
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

  function handleEditNameSubmit() {
    let newSkill = skill;
    newSkill.name = editName;

    fetch("/api/v1/skills", {
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
    //.then((body) => {});
    setTimeout(() => {
      setRefresh(true);
    }, 400);
    // window.location.href.replace(`/skills/${skillId}`);
  }

  useEffect(() => {
    if (refresh) {
      fetch(`/api/v1/skills/${skillId}`, {
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
  }, [refresh]);

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
            // console.log(tempExp[j].focus);
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

  function handleDeleteEntry(e) {
    var tempSkill = skill;
    tempSkill.expEntries = tempSkill.expEntries.filter((expEntry) => {
      return expEntry.id !== Number(e.target.id);
    });

    fetch("/api/v1/skills", {
      headers: {
        "Content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(tempSkill),
    }).then(() => {
      setTimeout(() => {
        fetch("/api/v1/expentries/" + e.target.id, {
          method: "DELETE",
        });
        setRefresh(true);
        // window.location.replace(`/skills/${skillId}`);
      }, 500);
    });
  }

  function handleAddExp() {
    if (addExpLength !== 0 && addExpFocus > 0) {
      // the base exp per hour will be 100
      const addExpValue = addExpLength * 50 * (addExpFocus / 2);

      fetch("/api/v1/expentries", {
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
        .then((expEntry) => {
          setTimeout(() => {
            console.log("NOW UPDATING EXP");
            skill.expEntries.push(expEntry);
            fetch("/api/v1/skills", {
              headers: {
                "Content-type": "application/json",
              },
              method: "PUT",
              body: JSON.stringify(skill),
            });
            // setRefresh(true);
            setRefresh(true);
          }, 800);
        });
    }
  }

  function handleAddGoal() {
    fetch("/api/v1/goals", {
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
      .then((goal) => {
        setTimeout(() => {
          skill.goals.push(goal);
          fetch("/api/v1/skills", {
            headers: {
              "Content-type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(skill),
          });
          setRefresh(true);
          // window.location.replace(`/skills/${skillId}`);
        }, 800);
      });
  }
  function handleDeleteGoal(e) {
    var tempSkill = skill;
    tempSkill.goals = tempSkill.goals.filter((goal) => {
      return goal.id !== Number(e.target.id);
    });

    fetch("/api/v1/skills", {
      headers: {
        "Content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(tempSkill),
    }).then(() => {
      setTimeout(() => {
        fetch("/api/v1/goals/" + e.target.id, {
          method: "DELETE",
        });
        setRefresh(true);
        // window.location.replace(`/skills/${skillId}`);
      }, 500);
    });
  }

  function handleGoalChange(e) {
    var tempGoal = skill.goals.find((goal) => "" + goal.id === e.target.id);
    tempGoal.complete = !tempGoal.complete;

    fetch("/api/v1/goals", {
      headers: {
        "Content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(tempGoal),
    }).then(() => {
      setTimeout(() => {
        setRefresh(true);
      }, 500);
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

  return (
    <div className="skill-view-container">
      {skill ? (
        <>
          <div className="compo exp-bar">
            {skill.name} - {level}
            <progress value={currentBar} max={max}></progress>
            <br />
            <button
              onClick={() => {
                setShowEditName(!showEditName);
              }}
            >
              Edit
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
                  Update Name
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
                <p>Average time: {averageTime}h</p>
                <p>Average focus: {averageFocus}</p>
                <p>Total time: {totalTime}</p>
                <p>Total EXP: {totalExp}</p>
              </div>
              <div className="compo">
                <h4>Goals:</h4>
                <hr />
                {skill.goals.map((goal) => {
                  return (
                    <>
                      {goal.complete ? (
                        <s>
                          <div key={goal.id}>
                            Goal: {goal.goal} Deadline: {goal.deadLine} Start
                            date: {goal.startDate}
                            End Date: {goal.endDate}
                            <button
                              id={goal.id}
                              onClick={(e) => {
                                handleGoalChange(e);
                              }}
                            >
                              COMPLETED!
                            </button>
                            <button
                              id={goal.id}
                              onClick={(e) => {
                                handleDeleteGoal(e);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </s>
                      ) : (
                        <div key={goal.id}>
                          Goal: {goal.goal} Deadline: {goal.deadLine} Start
                          date: {goal.startDate}
                          {/* End Date: {goal.endDate} */}
                          <button
                            id={goal.id}
                            onClick={(e) => {
                              handleGoalChange(e);
                            }}
                          >
                            Completed?
                          </button>
                          <button
                            id={goal.id}
                            onClick={(e) => {
                              handleDeleteGoal(e);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  );
                })}
                <input
                  className="goal-text-box"
                  type="text"
                  value={addGoalInfo}
                  onChange={(e) => {
                    setAddGoalInfo(e.target.value);
                  }}
                />
                <br />
                Start date:
                <input
                  type="date"
                  value={addGoalStartDate}
                  onChange={(e) => {
                    setAddGoalStartDate(e.target.value);
                  }}
                />
                DeadLine:
                <input
                  type="date"
                  value={addGoalDeadLine}
                  onChange={(e) => {
                    setAddGoalDeadLine(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    handleAddGoal();
                  }}
                >
                  Add new goal
                </button>
              </div>
              <div className="compo">
                <h4>Exp Entries</h4>
                <hr />
                Add experience: How many hours did you put in the dojo?
                <input
                  type="number"
                  min={0}
                  value={addExpLength}
                  onChange={(e) => {
                    setAddExpLength(e.target.value);
                  }}
                />
                <br />
                Out of 5 how focused were you? (1-5)
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={addExpFocus}
                  onChange={(e) => {
                    setAddExpFocus(e.target.value);
                  }}
                />
                <br />
                <input
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
                {skill.expEntries.map((entry) => {
                  return (
                    <div key={entry.id}>
                      ID: {entry.id}....EXP: {entry.exp}....Date:{" "}
                      {entry.timeEntry}
                      <button
                        id={entry.id}
                        onClick={(e) => {
                          handleDeleteEntry(e);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="main-right">
              <div className="compo">
                <h4>Line Plots</h4>
                <hr />
                EXP SMA LENGTH
                <input
                  value={expSmaLength}
                  type="number"
                  onChange={(e) => {
                    setExpSmaLength(e.target.value);
                  }}
                />
                <LinePlot data={expGraph} dataName={"exp"} smaName={"sma"} />
                <LinePlot
                  data={expGraph}
                  dataName={"focus"}
                  smaName={"focusSma"}
                />
                <LinePlot
                  data={totalExpGraph}
                  dataName={"exp"}
                  smaName={"sma"}
                />
              </div>
            </div>
          </div>
          <footer className="compo">Footer information.</footer>
        </>
      ) : (
        <>No skill found</>
      )}
    </div>
  );
};

export default SkillView;
