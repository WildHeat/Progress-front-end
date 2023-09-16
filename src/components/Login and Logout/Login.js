import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const BASEURL = "http://13.40.86.103:8080";
  // const BASEURL = "http://localhost:8080";

  function handleSubmit() {
    if (username === "" || password === "") {
      setErrorMessage("Please enter your details");
      return;
    }
    const reqBody = {
      username: username,
      password: password,
    };

    fetch(BASEURL + "/api/v1/login", {
      headers: {
        "Content-type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.text(), response.headers]);
        else if (response.status === 401)
          return Promise.reject("Invalid login attempt");
        else
          return Promise.reject("Something went wrong! Please try again later");
      })
      .then(([body, headers]) => {
        localStorage.setItem("jwt", JSON.stringify(body));
        window.location.href = "/profile";
      })
      .catch((message) => {
        console.log("ERROR: " + message);
        // setErrorMessage(message);
      });
  }

  return (
    <div className="login-page-container">
      <div className="login-container">
        <h4 className="small-page-title">Login</h4>
        <div>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username..."
          />
        </div>
        <div>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="error-message">{errorMessage}</p>
        <div>
          <button type="submit" onClick={() => handleSubmit()}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
