import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import Header from "./Header.js";
import HomePageProfile from "./HomePageProfile.js";
import MainContent from "./MainContent.js";
import AllSkills from "./AllSkills.js";

function Homepage() {
  const [user, setUser] = useState("");
  const [jwt, setJwt] = useLocalState("jwt", "");

  // const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (jwt)
      fetch("/api/v1/users/user-details", {
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + jwt,
        },
        method: "get",
      })
        .then((response) => {
          if (response.status === 200)
            return Promise.all([response.json(), response.headers]);
          else return Promise.reject("Somthing went wrong. Try logging in.");
        })
        .then(([body]) => {
          setUser(body);
          // setUpdate(true);
        })
        .catch((message) => {
          setJwt(null);
          console.log(message);
          alert(message);
        });
  }, [jwt, setJwt]);

  return (
    <div>
      {user ? (
        <>
          <HomePageProfile user={user} />
          <AllSkills user={user} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Homepage;
