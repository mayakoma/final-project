import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { getBasketTotal } from "../../context/reducer";
import { getBasketItemAmount } from "../../context/reducer";
import { initialState } from "../../context/reducer";
import "./Subtotal.css";
import Button from "../Button/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import validator from "validator";
import { DataContext } from "../../context/data-context";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const auth = useContext(DataContext);

  const nameRef = useRef({ value: "" });
  const emailRef = useRef({ value: "" });
  const navigate = useNavigate();
  const name = nameRef.current.value;
  const email = emailRef.current.value;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const checkoutDone = async () => {
    if (name !== "" && validator.isEmail(email) && basket.length > 0) {
      basket.map((item) => {
        dispatch({
          type: "REMOVE_FROM_BASKET",
          title: item.title,
        });
      });
      console.log("done");
      console.log(basket);
      setOpen(true);
    }

    if (auth.isLoggedIn && basket.length > 0) {
      basket.map((item) => {
        dispatch({
          type: "REMOVE_FROM_BASKET",
          title: item.title,
        });
      });
      console.log("done");
      console.log(basket);
      setOpen(true);
    }
  };

  const closeModal = () => {
    setOpen(false);
    navigate("/");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 200,
    bgcolor: "background.paper",
    border: "3px solid #000",
    boxShadow: 24,
    p: 4,
    fontSize: "large",
    fontSize: "30px",
    fontFamily: "monospace",
  };

  return (
    <div className="subtotal">
      <p>
        Subtotal ({getBasketItemAmount(basket)} items):{" "}
        <strong>$ {getBasketTotal(basket).toFixed(2)}</strong>
      </p>
      {!auth.isLoggedIn && (
        <div className="subtotal__details">
          <label className="subtotal__name">Name</label>
          <input
            className="subtotal__name-input"
            type="text"
            ref={nameRef}
            placeholder="enter your name"
          />
          <label className="subtotal__email">Email</label>
          <input
            className="subtotal__email-input"
            type="text"
            ref={emailRef}
            placeholder="enter your email"
          />
        </div>
      )}

      <Button
        title="Checkout"
        onClick={checkoutDone}
        className="checkout__button"
      />
      <Modal
        open={open}
        onClose={() => closeModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h3">
            <h3>The order is finish</h3>
          </Typography>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            <h4>enjoy 😃</h4>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Subtotal;
