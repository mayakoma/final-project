import React from "react";
import "./Navigation.css";

const Navigation = function () {
  return (
    <div className="navigation">
      <div className="navigation_title">
        <h1>Website's name</h1>
      </div>
      <div className="navigation_auth">
        <div className="navigation_pageslink">Products</div>
        <div className="navigation_pageslink">Profile</div>
        <div className="navigation_authLink">Login</div>
        <div className="navigation_authLink">Sign up</div>
      </div>
    </div>
  );
};

export default Navigation;
