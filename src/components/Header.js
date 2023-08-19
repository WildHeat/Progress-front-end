import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [showNav, setShowNav] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
    if (localStorage.getItem("jwt") === "null") {
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
      <button
        className="mobile-nav-toggle"
        aria-controls="primary-navigation"
        aria-expanded="false"
        onClick={() => {
          setShowNav(!showNav);
        }}
      >
        <span className="sr-only">Menu</span>
      </button>

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
