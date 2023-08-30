import React, { useState } from "react";
import Skill from "./Skill";
import { getTodaysDate } from "../../util/getTodaysDate";

const AllSkills = (props) => {
  const [newSkillName, setNewSkillName] = useState("");

  function handleNewSkillSubmit() {
    if (props.user) {
      let newSkill = {
        name: newSkillName,
        exp: 0,
        startDate: getTodaysDate(),
      };
      let tempUser = props.user;
      delete tempUser.authorities;

      fetch("/api/v1/skills", {
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newSkill),
        method: "post",
      })
        .then((response) => {
          if (response.status === 200) {
            return Promise.all([response.json(), response.headers]);
          } else {
            return Promise.reject(
              "Failed to add new skill. Somthing went wrong."
            );
          }
        })
        .then(([body]) => {
          console.log(body);
          tempUser.skills.push(body);

          fetch("/api/v1/users", {
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(tempUser),
            method: "put",
          })
            .then((response) => {
              if (response.status === 201)
                return Promise.all([response.json(), response.headers]);
              else
                return Promise.reject("Failed to update. Somthing went wrong.");
            })
            .then(([body]) => {
              window.location.replace("/");
            });
          window.location.replace("/");
        });
    }
  }

  function handleDeleteSkill(e) {
    //first need to update the user to remove the skill then you can delete it.
    var tempUser = props.user;
    tempUser.skills = tempUser.skills.filter((skill) => {
      return skill.id !== Number(e.target.name);
    });

    delete tempUser.authorities;

    fetch("/api/v1/users", {
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(tempUser),
      method: "put",
    }).then((response) => {
      console.log("Response Status =", response.status);
    });
    setTimeout(() => {
      fetch("/api/v1/skills/" + e.target.name, {
        method: "delete",
      });
      window.location.replace("/");
    }, 1000);
  }

  function displaySkills() {
    var listOfSkills = [];
    for (let i = 0; i < props.user.skills.length; i++) {
      listOfSkills.push(
        <div className="skill-box" key={i}>
          <Skill
            skill={props.user.skills[i].name}
            goals={props.user.skills[i].goals}
            exp={props.user.skills[i].exp}
            id={i}
            skillId={props.user.skills[i].id}
          />
          <button
            className="skill-delete-button"
            id={i}
            name={props.user.skills[i].id}
            onClick={(e) => {
              handleDeleteSkill(e);
            }}
          >
            Delete
          </button>
        </div>
      );
    }
    return listOfSkills;
  }

  return (
    <>
      <h2 className="skills-title">Skills</h2>
      <div className="all-skills-container">{displaySkills()}</div>
      <div className="add-skill-container">
        <label>
          New skill name
          <input
            name="skillName"
            type="text"
            value={newSkillName}
            onChange={(e) => {
              setNewSkillName(e.target.value);
            }}
          />
        </label>

        <div>
          <input
            type="submit"
            value="Add new skill"
            onClick={() => handleNewSkillSubmit()}
          />
        </div>
      </div>
    </>
  );
};

// <div className='container'>

//     <div className="row">
//         <div className="col"><Skill skill={user.user.skills[0].name} exp={user.user.skills[0].exp} /> </div>
//         <div className="col"><Skill skill="React" exp="20" /> </div>
//     </div>
//     <div className="row">
//         <div className="col"><Skill skill="Java" exp="20" /> </div>
//         <div className="col"><Skill skill="SQL" exp="20" /> </div>
//     </div>
//     <div className="row">
//         <div className="col"><Skill skill="Spring" exp="20" /> </div>
//         <div className="col"><AddSkillButtton/> </div>
//     </div>
// </div>

export default AllSkills;
