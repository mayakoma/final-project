import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = function () {
  return (
    <div className="navigation">
      <div className="navigation_title">
        <NavLink to="/">Website's name</NavLink>
        {/* <h1>Website's name</h1> */}
      </div>

      <ul className="navigation_links">
        <li>
          <NavLink to="/login">Log In</NavLink>
        </li>
        <li>
          <NavLink to="/signup">SignUp</NavLink>
        </li>
        <li>
          <NavLink to="/list">Products</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
