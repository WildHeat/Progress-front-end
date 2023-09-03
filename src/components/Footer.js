import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="made-in-care-container">
        <p>
          Made with <span>care</span> in 2023
        </p>
      </div>
      <div className="link-container">
        <div className="link-inner-container">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/about">
            About
          </Link>
        </div>
        <div className="link-inner-container">
          <Link
            className="nav-link"
            target="_blank"
            to="https://www.linkedin.com/in/aron-berhane-0485b820b/"
          >
            LinkedIn
          </Link>
          <Link
            className="nav-link"
            target="_blank"
            to="https://github.com/WildHeat"
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
