import React from "react";
import { useLocalState } from "../util/useLocalStorage";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalState("jwt", "");
  return (
    <>
      {jwt ? (
        children
      ) : (
        <p>Please Login or Register to gain the full value of this website</p>
      )}
    </>
  );
};

export default PrivateRoute;
