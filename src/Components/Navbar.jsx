import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../Context/Contexts";
import { AdminNav } from "./AdminNav";
import { ClientNav } from "./ClientNav";

export const NavBar = (props) => {
  const { user } = useContext(userContext);
  return user ? user.admin ? <AdminNav /> : <ClientNav /> : <ClientNav />;
};
