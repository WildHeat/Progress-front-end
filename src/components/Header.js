import React from "react";

function Header(user) {
  console.log(user.user.id)
  return <nav className="navbar navbar-expand-sm navbar-light bg-info py-3">
  <div className="characterinfo">
    <img className="characterIcon" src={require("../img/icon1.jpg")} alt="Character Icon"/>
    <div className="progress">
      <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
    <span className="sr-only">15 % </span>
  </div>
</div>
    <p>{user.username}{user.user.username} - Level 10</p>
  </div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mx-auto">
      <li className="nav-item active">
        <a className="nav-link" href="!#">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="!#">About</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="!#">Dojo</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="!#">More</a>
      </li>
    </ul>
  </div>
</nav>;
}

export default Header;
