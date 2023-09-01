import React, { useState } from "react";
import { getTodaysDate } from "../util/getTodaysDate";
// import Axios from 'axios'

function AddUserForm() {
  // const url = "/api/v1/users";
  const [errorMessage, setErrorMessage] = useState([]);
  const [data, setData] = useState({
    username: "",
    password: "",
    skill: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage([]);
    let errors = [];

    if (data.password.length < 8) {
      errors.push("Password needs to be 8 characters or longer");
    }

    if (!/\d/.test(data.password)) {
      errors.push("Password needs to contain at least 1 number");
    }

    if (!/[A-Z]/.test(data.password)) {
      errors.push("Password needs contain at least 1 uppercase letter");
    }

    if (!/[a-z]/.test(data.password)) {
      errors.push("Password needs contain at least 1 lowercase letter");
    }

    if (!/[a-zA-Z]/.test(data.username)) {
      errors.push("Username must contain at least one letter");
    }

    setErrorMessage(errors);

    if (errors.length > 0) return;

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
        {errorMessage.map((error) => {
          return (
            <div key={error}>
              - {error}
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AddUserForm;
