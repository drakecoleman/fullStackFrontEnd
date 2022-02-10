import React, { useState, useEffect, useContext } from "react";

import Notlogged from "./greetingScreens/notLoggedGreeting";
import Logged from "./greetingScreens/loggedGreeting";
import { LoginContext, DialogueContext } from "./../../Context/context";

function Home() {
  const { userInfo, setUserInfo } = useContext(LoginContext);
  const { openDialogue, setDialogue } = useContext(DialogueContext);
  let [logged, changeLogged] = useState(false);
  let [usersArray, setUsersArray] = useState([]);
  useEffect(() => {
    fetch("https://profilestiebackend.herokuapp.com/", {
      method: "GET",
      credentials: "include",
      withCredentials: true,

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        const data = response.json();
        return data;
      })
      .then((data) => {
        if (data.auth != false) {
          setUserInfo({
            ...userInfo,
            id: data.user._id,
            fName: data.user.fName,
            lName: data.user.lName,
            title: data.user.title,
          });
          console.log(data);
          changeLogged(true);
          setUsersArray(data.response);
        } else {
          console.log(data);
          return changeLogged(false);
        }
      })

      .catch((err) => console.log(err));
  }, [logged, changeLogged]);
  // Check

  return logged ? <Logged users={usersArray} /> : <Notlogged />;
}
export default Home;
