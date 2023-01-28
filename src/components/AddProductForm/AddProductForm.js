import React, { useState, useRef } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../Hook/HttppHook";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./AddProductForm.css";

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

function AddProductForm() {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [validName, setValidName] = useState(true);
  const [validPrice, setValidPrice] = useState(true);
  const [validImg, setValidImg] = useState(true);
  const [validDesc, setValidDesc] = useState(true);
  const [firstTime, setFirstTime] = useState(true);
  const [open, setOpen] = useState(false);

  const productName = useRef({ value: "" });
  const productPrice = useRef({ value: "" });
  const productImgSrc = useRef({ value: "" });
  const productDescription = useRef({ value: "" });

  const closeModal = () => {
    setOpen(false);
  };

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
        productName.current.value = "";
        productPrice.current.value = "";
        productDescription.current.value = "";
        productImgSrc.current.value = "";
        // name = "";
        // price = "";
        // img = "";
        // description = "";
        setOpen(true);

        navigate("/admin");
      } catch (err) {}
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
      <Button className="update_btn" onClick={submit} title="Add product" />
      <Modal
        open={open}
        onClose={() => closeModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h3">
            <h3>The product add</h3>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default AddProductForm;
