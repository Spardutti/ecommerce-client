import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

export const Token = (props) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const url = window.location.href;
    const urlToken = url.split("?")[1];
    //split token=
    const localToken = urlToken.split("=")[1];
    setToken(urlToken.split("=")[1]);
    window.history.pushState({}, "", url.split("?")[0]);
    localStorage.setItem("token", localToken);
  }, []);
  return <div>{token ? <Redirect to="/" /> : null}</div>;
};
