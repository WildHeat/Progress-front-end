import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  const [showNav, setShowNav] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [jwt, setJwt] = useState(null);
  var tempJwt = localStorage.getItem("jwt");

  useEffect(() => {
    setJwt(JSON.parse(localStorage.getItem("jwt")));
  }, [tempJwt]);

  useEffect(() => {
    const updateDimension = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateDimension);

    if (windowWidth >= 640) {
      setShowNav(true);
    }

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [windowWidth]);

  const isLoggedInNavBar = () => {
    if (jwt === null) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </>
      );
    }
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/logout">
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <Link className="logo" to="/">
        <h3 className="logo">AB Tracker</h3>
      </Link>

      <FontAwesomeIcon
        icon={showNav ? "times" : "bars"}
        className="mobile-nav-toggle"
        onClick={() => {
          setShowNav(!showNav);
        }}
      />

      <nav>
        <ul
          className="primary-navigation"
          style={
            showNav
              ? { transform: "translateX(0)" }
              : { transform: "translateX(100%)" }
          }
        >
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>

          {isLoggedInNavBar()}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
