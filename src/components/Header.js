import { useEffect, useState } from "react";

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
    // console.log(localStorage.getItem("jwt"));
    if (localStorage.getItem("jwt") === "null") {
      return (
        <>
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
        </>
      );
    }
    return (
      <li className="nav-item">
        <a className="nav-link" href="/logout">
          Logout
        </a>
      </li>
    );
  };

  return (
    <header>
      <h3 className="logo">Progress Tracker</h3>
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
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">
              About
            </a>
          </li>
          {isLoggedInNavBar()}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
