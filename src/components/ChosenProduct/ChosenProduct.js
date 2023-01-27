import React, { useEffect, useState, useRef } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { useHttpClient } from "../../Hook/HttppHook";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Button from "../Button/Button";
import "./ChosenProduct.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 400,
  bgcolor: "background.paper",
  border: "3px solid #000",
  boxShadow: 24,
  p: 4,
  fontSize: "large",
  fontSize: "30px",
  fontFamily: "monospace",
};

function ChosenProduct(props) {
  const [state, dispatch] = useStateValue();
  const [productEl, setProductEl] = useState("");
  const [open, setOpen] = useState(false);
  const title = useRef({ value: "" });
  const price = useRef({ value: "" });
  const description = useRef({ value: "" });

  const index = useParams().index;
  // const productFromList = props.products.find((p) => p._id === index);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    getProduct();
    console.log(productEl);
  }, []);

  const closeModal = () => {
    setOpen(false);
  };

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

  const openForm = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="chosenProduct__container">
        <Link to="/">
          <IoMdArrowBack className="chosenProduct__back" />
        </Link>
        <div className="chosenProduct__title">{productEl.title}</div>
        <img src={productEl.image} className="chosenProduct__img" />

        <div className="chosenProduct__details">
          <div className="chosenProduct__description">
            {productEl.description}
          </div>
          <div className="chosenProduct__price">price : {productEl.price}$</div>
        </div>
        <div className="buttons">
          <Button
            className="chosenProduct__button"
            title="Add to cart"
            onClick={addToBasket}
          >
            <FaShoppingCart className="basken__icon" />
          </Button>
          <Button
            className="chosenProduct__button"
            title="Edit Product"
            onClick={openForm}
          ></Button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => closeModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="div" component="div">
            <input
              className="title"
              type="text"
              placeholder={productEl.title}
              ref={title}
            />
            <input
              className="description"
              type="text"
              placeholder={productEl.description}
              ref={description}
            />
            <input
              className="price"
              type="text"
              placeholder={productEl.price}
              ref={description}
            />
          </Typography>
          <Typography id="modal-modal-title" variant="div" component="div">
            {/* <div className="signup__radio">
              <p className="signup__radio-title">Area : </p>
              <ButtonGroup size="sm" className="buttons">
                {radios2.map((radio2, idx) => (
                  <ToggleButton
                    size="small"
                    className="toggle2"
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? "outline-success" : "outline-danger"}
                    name="radio"
                    value={radio2.value}
                    checked={radioArea === radio2.value}
                    onChange={(e) => changeRadioArea(e)}
                  >
                    {radio2.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div> */}
          </Typography>
          <Typography id="modal-modal-title" variant="div" component="div">
            <button onClick={() => {}}>update</button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default ChosenProduct;
