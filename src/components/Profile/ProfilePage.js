import React, { useEffect, useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import ProfileSection from "./ProfileSection.js";
import AllSkills from "./AllSkills.js";

function ProfilePage() {
  const [user, setUser] = useState("");
  const [jwt, setJwt] = useLocalState("jwt", "");
  const BASEURL = "http://13.40.86.103:8080";
  // const BASEURL = "http://localhost:8080";

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(BASEURL + "/api/v1/users/user-details", {
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
            window.location.href = "/login";
            alert(message);
          });
      } catch (error) {
        console.error(error);
      }
    };
    if (jwt) {
      fetchData();
    }
  }, [jwt, setJwt]);

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
