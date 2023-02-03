import React, { useEffect, useState, useRef, useContext } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { useHttpClient } from "../../Hook/HttppHook";
import { DataContext } from "../../context/data-context";
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
  height: 300,
  bgcolor: "background.paper",
  border: "3px solid #000",
  boxShadow: 24,
  p: 4,
  fontSize: "large",
  fontSize: "30px",
  fontFamily: "monospace",
};

const style2 = {
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

function ChosenProduct(props) {
  const [state, dispatch] = useStateValue();
  const [productEl, setProductEl] = useState("");
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  const [firstTime, setFirstTime] = useState(true);
  const [validName, setValidName] = useState(true);
  const [validPrice, setValidPrice] = useState(true);
  const [validDesc, setValidDesc] = useState(true);
  const navigate = useNavigate();
  const titleRef = useRef({ value: "" });
  const priceRef = useRef({ value: "" });
  const descriptionRef = useRef({ value: "" });
  const data = useContext(DataContext);

  const index = useParams().index;
  // const productFromList = props.products.find((p) => p._id === index);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    getProduct();
    console.log(productEl);
  }, []);

  // const closeModal = async () => {
  //   setOpen(false);
  //   data.addToList("");
  //   navigate("/");
  // };

  const closeModalDel = () => {
    setOpenDel(false);
    setOpen(false);
    console.log("close");
    data.addToList("");
    navigate("/");
  };

  const deleteProduct = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:3001/product/delete`,
        "DELETE",
        JSON.stringify({
          pid: productEl._id,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setOpenDel(true);
      console.log(responseData);
    } catch (err) {}
  };

  const updateProduct = async () => {
    let name = titleRef.current.value;
    let description = descriptionRef.current.value;
    let price = priceRef.current.value;

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

    if (description.length === 0) {
      setValidDesc(false);
    }
    if (description.length !== 0) {
      setValidDesc(true);
    }

    if (!firstTime && validName && validPrice && validDesc) {
      console.log(`name: ${name} price: ${price} description: ${description}`);
      try {
        const responseData = await sendRequest(
          `http://localhost:3001/product/update`,
          "POST",
          JSON.stringify({
            pid: productEl._id,
            title: name,
            description: description,
            price: price,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        navigate("/");
        console.log(responseData);
        name = "";
        price = "";
        description = "";
      } catch (err) {}
    }
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
          <div className="chosenProduct__price">price : {productEl.price}₪</div>
        </div>
        <div className="buttons">
          <Button
            className="chosenProduct__button"
            title="Add to cart"
            onClick={addToBasket}
          >
            <FaShoppingCart className="basken__icon" />
          </Button>
          {data.isAdmin && (
            <>
              <Button
                className="chosenProduct__button"
                title="Edit"
                onClick={openForm}
              ></Button>
              <Button
                className="chosenProduct__button"
                title="Delete"
                onClick={deleteProduct}
              ></Button>
            </>
          )}
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => closeModalDel()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="div" component="div">
            <div>Update Product</div>
          </Typography>
          <Typography id="modal-modal-title" variant="div" component="div">
            <input
              className="title"
              type="text"
              placeholder={productEl.title}
              ref={titleRef}
            />
            <input
              className="description"
              type="text"
              placeholder={productEl.description}
              ref={descriptionRef}
            />
            <input
              className="price"
              type="text"
              placeholder={productEl.price}
              ref={priceRef}
            />
          </Typography>
          <Typography id="modal-modal-title" variant="div" component="div">
            <Button onClick={updateProduct} title="update" />
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openDel}
        onClose={() => closeModalDel()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h3" component="h3">
            <h3>The product deleted</h3>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default ChosenProduct;
