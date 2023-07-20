import React from "react";
import { useLocalState } from "../util/useLocalStorage";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalState("jwt", "");
  return <>{jwt ? children : <p>No JWT</p>}</>;
};

export default PrivateRoute;
