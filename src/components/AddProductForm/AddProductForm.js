import React, { useState, useRef } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../Hook/HttppHook";
import "./AddProductForm.css";

function AddProductForm() {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [validName, setValidName] = useState(true);
  const [validPrice, setValidPrice] = useState(true);
  const [validImg, setValidImg] = useState(true);
  const [validDesc, setValidDesc] = useState(true);
  const [firstTime, setFirstTime] = useState(true);

  const productName = useRef({ value: "" });
  const productPrice = useRef({ value: "" });
  const productImgSrc = useRef({ value: "" });
  const productDescription = useRef({ value: "" });

  const submit = async () => {
    let name = productName.current.value;
    let price = productPrice.current.value;
    let img = productPrice.current.value;
    let description = productDescription.current.value;

    setFirstTime(false);

    if (name.length === 0) {
      setValidName(false);
    }
    if (name.length !== 0) {
      setValidName(true);
    }
    if (price.length === 0) {
      setValidPrice(false);
    }
    if (price.length !== 0) {
      setValidPrice(true);
    }
    if (img.length === 0) {
      setValidImg(false);
    }
    if (img.length !== 0) {
      setValidImg(true);
    }
    if (description.length === 0) {
      setValidDesc(false);
    }
    if (description.length !== 0) {
      setValidDesc(true);
    }

    if (!firstTime && validName && validPrice && validImg && validDesc) {
      try {
        const responseData = await sendRequest(
          `http://localhost:3001/product/add`,
          "POST",
          JSON.stringify({
            title: name,
            description: description,
            image: img,
            price: price,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(responseData);
      } catch (err) {}
      navigate("/");
    }
  };

  return (
    <div className="addProductForm">
      <h1>Add Product</h1>
      <input
        className="addProduct__name"
        type="text"
        placeholder="product name"
        ref={productName}
      />
      {!firstTime && !validName && (
        <p className="valid">Please enter product name</p>
      )}
      <input
        className="addProduct__price"
        type="text"
        placeholder="price"
        ref={productPrice}
      />
      {!firstTime && !validPrice && <p className="valid">Please enter price</p>}
      <input
        className="addProduct__img"
        type="text"
        placeholder="img src"
        ref={productImgSrc}
      />
      {!firstTime && !validImg && (
        <p className="valid">Please enter imageg src</p>
      )}
      <input
        className="addProduct__description"
        type="text"
        placeholder="description"
        ref={productDescription}
      />
      {!firstTime && !validDesc && (
        <p className="valid">Please enter description</p>
      )}
      <Button onClick={submit} title="Add product" />
    </div>
  );
}

export default AddProductForm;
