import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();
  return (
    <div className="logout-page-container">
      <div className="logout-container">
        <h4 className="small-page-title">Are you sure you want to logout?</h4>
        <button
          onClick={() => {
            localStorage.setItem("jwt", null);
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
