import React, { useContext } from "react";
import { userContext } from "../Context/Contexts";
import { AdminNav } from "./Admin/AdminNav";
import { Header } from "./Header";

export const NavBar = () => {
  const { user } = useContext(userContext);
  return user ? user.admin ? <AdminNav /> : <Header /> : <Header />;
};
