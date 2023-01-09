import Button from "../Button/Button";
import React from "react";
import { useStateValue } from "../../context/StateProvider";
import "./CheckoutProduct.css";
import { AiFillDelete } from "react-icons/ai";

// AiFillDelete

function CheckoutProduct({ title, image, price, amount, id, description }) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      title: title,
    });
  };

  const plusOne = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        amount: 1,
        price: price,
        description: description,
        image: image,
      },
      title: title,
    });
  };

  const minusOne = () => {
    dispatch({
      type: "MINUS_ONE_FROM_BASKET",
      item: {
        id: id,
        title: title,
        amount: 1,
        price: price,
        description: description,
        image: image,
      },
      title: title,
    });
  };

  return (
    <div className="checkoutProduct">
      <img src={image} alt="checkout img" className="checkoutProduct__img" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>

        <div className="checkoutProduct__amountDetils">
          <Button
            onClick={minusOne}
            title="-"
            className="checkoutProduct__btn checkoutProduct__btn-plus"
          />
          <p className="checkoutProduct__amount">{amount} </p>
          <Button
            onClick={plusOne}
            title="+"
            className="checkoutProduct__btn"
          />
        </div>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{(price * amount).toFixed(2)}</strong>
        </p>
        <Button
          className="checkoutProduct__remove"
          onClick={removeFromBasket}
          title="Remove "
        >
          <AiFillDelete />
        </Button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
