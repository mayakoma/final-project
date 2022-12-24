import { ClassNames } from "@emotion/react";
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = function () {
  return (
    <div className="navigation">
      <div className="navigation_title">
        <h1>Website's name</h1>
      </div>

      <ul className="navigation_links">
        <li>
          <NavLink to="/list">Products</NavLink>
        </li>
        <li>
          <NavLink to="/list">Products</NavLink>
        </li>
        <li>
          <NavLink to="/list">Products</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
