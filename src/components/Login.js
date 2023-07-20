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
    <>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={() => handleSubmit()}>
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
