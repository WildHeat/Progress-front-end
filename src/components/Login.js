import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("jwt", "");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit() {
    if (username === "" || password === "") {
      setErrorMessage("Please enter your details");
      return;
    }
    if (!jwt) {
      const reqBody = {
        username: username,
        password: password,
      };
      fetch("/api/v1/login", {
        headers: {
          "Content-type": "application/json",
        },
        method: "post",
        body: JSON.stringify(reqBody),
      })
        .then((response) => {
          if (response.status === 200)
            return Promise.all([response.json(), response.headers]);
          else if (response.status === 401)
            return Promise.reject("Invalid login attempt");
          else
            return Promise.reject(
              "Something went wrong! Please try again later"
            );
        })
        .then(([body, headers]) => {
          setJwt(headers.get("authorization"));
          window.location.replace("/profile");
        })
        .catch((message) => {
          setErrorMessage(message);
        });
    }
  }

  return (
    <div className="login-page-conatiner">
      <div className="login-container">
        <h4>Login</h4>
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
