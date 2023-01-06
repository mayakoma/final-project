import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { useStateValue } from "../../context/StateProvider";
import "./Product.css";

function Product(props) {
  const [state, dispatch] = useStateValue();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: props.id,
        title: props.title,
        amount: 1,
        price: props.price,
        description: props.description,
        image: props.image,
      },
      title: props.title,
    });
  };

  return (
    <Link to={`/${props.id}`}>
      <div className="product">
        <div className="product__details">
          <div className="product__title">{props.title}</div>
        </div>
        <img src={props.image} className="product__img" />
        <div className="product__price">price : {props.price} $</div>
        <Button
          onClick={addToBasket}
          className="product__Button"
          title="add"
        ></Button>
      </div>
    </Link>
  );
}

export default Product;
