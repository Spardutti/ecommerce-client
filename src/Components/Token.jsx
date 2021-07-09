import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

export const Token = (props) => {
  useEffect(() => {
    const url = window.location.href;
    const urlToken = url.split("?")[1];
    //split token=
    const token = urlToken.split("=")[1];
    window.history.pushState({}, "", url.split("?")[0]);
    localStorage.setItem("token", token);
  }, []);
  return <div>hola</div>;
};
