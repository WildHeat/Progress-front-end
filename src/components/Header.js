import React, { useEffect, useState } from "react";
import { currentLevel, getCurrentBar } from "../util/expToLevel";

function Header(props) {
  const [level, setLevel] = useState(2);
  const [max, setMax] = useState(0);
  const [currentBar, setCurrentBar] = useState(0);
  const user = props.user;

  useEffect(() => {
    if (user && user.skills.length !== 0) {
      var totalExp = 0;
      user.skills.forEach((skill) => {
        totalExp += skill.exp;
      });
      console.log(totalExp);
      setLevel(parseInt(currentLevel(totalExp, 300, 1.5), 10));
      var currentBarReturn = getCurrentBar(level, 300, 1.5, totalExp);
      setCurrentBar(currentBarReturn[0]);
      setMax(currentBarReturn[1]);
    }
  }, [user, level]);

  return (
    <nav className="navbar bg-info">
      <div className="characterinfo">
        <img
          className="characterIcon"
          src={require("../img/icon1.jpg")}
          alt="Character Icon"
        />
        <progress value={currentBar} max={max}></progress>
        <p>
          {user.username} - Level {level}
        </p>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/add-user">
              Register
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/logout">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
