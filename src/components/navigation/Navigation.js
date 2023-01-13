import React from "react";
import { useStateValue } from "../../context/StateProvider";
import { getBasketItemAmount } from "../../context/reducer";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Search from "../search/Search";
import Button from "../Button/Button";
import "./Navigation.css";

const Navigation = function () {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="navigation">
      <div className="navigation_title">
        <NavLink to="/">Website's name</NavLink>
        {/* <h1>Website's name</h1> */}
      </div>
      <div className="navigation_search"><Search /></div>
      <ul className="navigation_links">
        <li>
          <NavLink to="/login">Log In</NavLink>
        </li>
        <li>
          <NavLink to="/signup">SignUp</NavLink>
        </li>
        <li>
          <NavLink to="/admin">Admin</NavLink>
        </li>
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
