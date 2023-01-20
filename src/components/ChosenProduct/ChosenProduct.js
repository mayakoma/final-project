import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { useHttpClient } from "../../Hook/HttppHook";

import Button from "../Button/Button";
import "./ChosenProduct.css";

function ChosenProduct(props) {
  const [state, dispatch] = useStateValue();
  const [productEl, setProductEl] = useState("");

  const index = useParams().index;
  // const productFromList = props.products.find((p) => p._id === index);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    getProduct();
    console.log(productEl);
  }, []);

  const getProduct = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:3001/product/getById`,
        "POST",
        JSON.stringify({
          pid: index,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setProductEl(responseData);
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: productEl._id,
        title: productEl.title,
        amount: 1,
        price: productEl.price,
        description: productEl.description,
        image: productEl.image,
      },
      title: productEl.title,
    });
  };

  return (
    <div className="chosenProduct__container">
      <Link to="/">
        <IoMdArrowBack className="chosenProduct__back" />
      </Link>
      <div className="chosenProduct__title">{productEl[1]}</div>
      <img src={productEl.image} className="chosenProduct__img" />

      <div className="chosenProduct__details">
        <div className="chosenProduct__description">
          {productEl.description}
        </div>
        <div className="chosenProduct__price">price : {productEl.price}$</div>
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
