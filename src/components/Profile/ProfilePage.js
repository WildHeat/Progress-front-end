import React, { useEffect, useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import ProfileSection from "./ProfileSection.js";
import AllSkills from "./AllSkills.js";

function ProfilePage() {
  const [user, setUser] = useState("");
  const [jwt, setJwt] = useLocalState("jwt", "");

  useEffect(() => {
    if (jwt) {
      const fetchData = async () => {
        try {
          await fetch("/api/v1/users/user-details", {
            headers: {
              "Content-type": "application/json",
              authorization: "Bearer " + jwt,
            },
            method: "get",
          })
            .then((response) => {
              if (response.status === 200)
                return Promise.all([response.json(), response.headers]);
              else
                return Promise.reject("Somthing went wrong. Try logging in.");
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
