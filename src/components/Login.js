import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("jwt", "");

  function handleSubmit() {
    console.log("Logging in as", username, password);
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
          else return Promise.reject("Invalid login attempt");
        })
        .then(([body, headers]) => {
          console.log(body);
          console.log(headers.get("authorization"));
          setJwt(headers.get("authorization"));
          window.location.replace("/");
        })
        .catch((message) => {
          console.log(message);
          alert(message);
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
