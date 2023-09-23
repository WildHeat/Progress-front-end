import React from "react";
import Header from "./Header/Header";

const HeaderUpdater = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default HeaderUpdater;
