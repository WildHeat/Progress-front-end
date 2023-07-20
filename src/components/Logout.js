import React from "react";

const Logout = () => {
  return (
    <div>
      <p>Are you sure you want to logout?</p>
      <button
        onClick={() => {
          localStorage.setItem("jwt", null);
          window.location.replace("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
