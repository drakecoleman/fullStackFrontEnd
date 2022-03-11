import React, { useContext, useState, useEffect } from "react";
import Skeleton from "./../homeScreen/greetingScreens/profileSkeleton";
import { useHistory } from "react-router-dom";
import { LoginContext } from "./../../Context/context";

function Messages(props) {
  const { userInfo, setUserInfo } = useContext(LoginContext);
  const history = useHistory();

  fetch("https://www.thehoodconservative.com/", {
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
        return;
      } else {
        history.push("/");
        return;
      }
    })

    .catch((err) => console.log(err));

  return <Skeleton />;
}
export default Messages;
