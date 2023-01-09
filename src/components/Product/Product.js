import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

import "./Product.css";

function Product(props) {
  return (
    <Link to={`/${props.id}`}>
      <div className="product">
        <div className="product__details">
          <div className="product__title">{props.title}</div>
        </div>
        <img src={props.image} className="product__img" />
        <div className="product__price">price : {props.price} $</div>
      </div>
    </Link>
  );
}

export default Product;
