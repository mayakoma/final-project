import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import Button from "../Button/Button";
import "./ChosenProduct.css";

function ChosenProduct(props) {
  const [state, dispatch] = useStateValue();
  const index = useParams().index;
  const productFromList = props.products.find((p) => p.id == index);

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: productFromList.id,
        title: productFromList.title,
        amount: 1,
        price: productFromList.price,
        description: productFromList.description,
        image: productFromList.image,
      },
      title: productFromList.title,
    });
  };

  return (
    <div className="chosenProduct__container">
      <Link to="/">
        <IoMdArrowBack className="chosenProduct__back" />
      </Link>
      <div className="chosenProduct__title">{productFromList.title}</div>
      <img src={productFromList.image} className="chosenProduct__img" />

      <div className="chosenProduct__details">
        <div className="chosenProduct__description">
          {productFromList.description}
        </div>
        <div className="chosenProduct__price">
          price : {productFromList.price}$
        </div>
      </div>
      <Button
        className="chosenProduct__button"
        title="Add to cart"
        onClick={addToBasket}
      >
        <FaShoppingCart className="basken__icon" />
      </Button>
    </div>
  );
}

export default ChosenProduct;
