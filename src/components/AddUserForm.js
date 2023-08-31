import React, { useState } from "react";
import { getTodaysDate } from "../util/getTodaysDate";
// import Axios from 'axios'

function AddUserForm() {
  // const url = "/api/v1/users";
  const [data, setData] = useState({
    username: "",
    password: "",
    skill: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    window.location.replace("/login");
    fetch("/api/v1/users", {
      headers: {
        "Content-type": "application/json",
      },
      method: "post",
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        userJoinDate: getTodaysDate(),
        skills: [{ name: data.skill }],
      }),
    });
  }

  function handleChange(e) {
    // console.log(data)
    const newData = {
      username: data.username,
      password: data.password,
      skill: data.skill,
    };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(
      JSON.stringify({
        username: data.username,
        password: data.password,
        userJoinDate: getTodaysDate(),
        skills: [{ name: data.skill }],
      })
    );
  }

  return (
    <div className="register-page-container">
      <div className="register-container">
        <h4>Register</h4>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            onChange={(e) => handleChange(e)}
            value={data.username}
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter Username..."
          />
          <input
            onChange={(e) => handleChange(e)}
            value={data.password}
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password..."
          />
          <input
            onChange={(e) => handleChange(e)}
            value={data.skill || ""}
            type="text"
            className="form-control"
            id="skill"
            placeholder="Enter First Skill..."
          />
          <input type="submit" value="Start Your Journey" />
        </form>
      </div>
    </div>
  );
}

export default AddUserForm;
