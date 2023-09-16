import React from "react";

const Logout = () => {
  return (
    <div className="logout-page-container">
      <div className="logout-container">
        <h4 className="small-page-title">Are you sure you want to logout?</h4>
        <button
          onClick={() => {
            localStorage.setItem("jwt", null);
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
