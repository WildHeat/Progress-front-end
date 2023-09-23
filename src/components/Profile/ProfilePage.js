import React, { useEffect, useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import ProfileSection from "./ProfileSection.js";
import AllSkills from "./AllSkills.js";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

function ProfilePage() {
  const [user, setUser] = useState("");
  const [jwt, setJwt] = useLocalState("jwt", "");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(process.env.REACT_APP_URL + "/api/v1/users/user-details", {
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
          })
          .catch((message) => {
            setJwt(null);
            navigate("/login");
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (jwt) {
      fetchData();
    }
  }, [navigate, jwt, setJwt]);

  return (
    <div>
      {user ? (
        <div>
          <ProfileSection user={user} />
          <AllSkills user={user} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProfilePage;
