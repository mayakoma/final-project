import React, { useContext } from "react";
import { useStateValue } from "../../context/StateProvider";
import { getBasketItemAmount } from "../../context/reducer";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { DataContext } from "../../context/data-context";

import Search from "../search/Search";
import Button from "../Button/Button";
import "./Navigation.css";

const Navigation = function () {
  const [{ basket }, dispatch] = useStateValue();
  const auth = useContext(DataContext);

  const logOutHandlet = () => {
    auth.logout();
    if (auth.isAdmin) auth.adminOut();
  };

  return (
    <div className="navigation">
      <div className="navigation_title">
        <NavLink to="/">
          <img
            className="logo"
            src="https://assets.stickpng.com/images/612ce4761b9679000402af1c.png"
            alt="logo"
          />
        </NavLink>
      </div>
      <div className="navigation_search">
        <Search />
      </div>
      <ul className="navigation_links">
        {!auth.isLoggedIn && (
          <>
            <li>
              <NavLink to="/login">Log In</NavLink>
            </li>
            <li>
              <NavLink to="/signup">SignUp</NavLink>
            </li>
          </>
        )}
        {auth.isLoggedIn && (
          <>
            <li>
              <NavLink onClick={logOutHandlet} to="/">
                Log Out
              </NavLink>
            </li>
          </>
        )}
        {auth.isAdmin && (
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
        )}

        <li>
          <NavLink to="/checkout">
            <Button className="toCart_btn">
              <span className="shoppin__icon">
                <FaShoppingCart />
              </span>
              <span>Your Cart</span>
              <span className="shopping__amount">
                {getBasketItemAmount(basket)}
              </span>
            </Button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
