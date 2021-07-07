import { useState } from "react";
import { Link } from "react-router";
export const Navigation = () => {
  return (
    <div className="d-flex justify-content-between px-5 pt-2 bg-light topbar">
      <h4>User</h4>
      <p>Lorem, ipsum.</p>
      <div className="d-flex">
        <p className="mx-2">cart</p>
        <p>log out</p>
      </div>
    </div>
  );
};
