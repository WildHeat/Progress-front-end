import React from "react";

function Header(props) {
  const max = 100;
  const currentBar = 30;
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-info py-3">
      <div className="characterinfo">
        <img
          className="characterIcon"
          src={require("../img/icon1.jpg")}
          alt="Character Icon"
        />
        <progress value={currentBar} max={max}></progress>
        <p>{props.user.username} - Level 10</p>
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
