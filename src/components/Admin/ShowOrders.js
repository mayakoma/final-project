import Button from "../Button/Button";
import React, { useState, useRef, useContext } from "react";
import { useHttpClient } from "../../Hook/HttppHook";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DataContext } from "../../context/data-context";

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

function ShowOrders({ list }) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [open, setOpen] = useState(false);
  const [orderEditId, setOrderEditId] = useState({});
  const data = useContext(DataContext);
  const addressRef = useRef({ value: "" });

  const deleteObject = async (objId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:3001/order/delete`,
        "DELETE",
        JSON.stringify({
          orderId: objId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
      data.setIsChange(true);
    } catch (err) {}
  };

  const editOrder = (objId) => {
    setOpen(true);
    setOrderEditId(objId);
    console.log("edit");
  };

  const closeModal = () => {
    setOpen(false);
  };

  const updateOrder = async () => {
    const address = addressRef.current.value;
    try {
      const responseData = await sendRequest(
        `http://localhost:3001/order/update`,
        "PATCH",
        JSON.stringify({
          orderId: orderEditId._id,
          address: address,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      closeModal();
      data.setIsChange(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (!list || list == [] || list.length === 0) return null;
  else
    return (
      <>
        <ul className="showOrders">
          {list.map((l, i) => (
            <li key={i} className="showOrders_orderItem">
              <div className="showOrders_info">
                <p>
                  <strong>Order Number:</strong> {l._id}
                </p>
                <p>
                  <strong>Date: </strong>
                  {l.orderDate}
                </p>
                <p>
                  {" "}
                  <strong>Address: </strong>
                  {l.address}
                </p>
                <p>
                  {" "}
                  <strong>Total Price: </strong>
                  {l.totalPrice}
                </p>
              </div>
              <div className="ShowDetails_btns">
                <button
                  className="showDetails_delBtn"
                  onClick={() => {
                    editOrder(l);
                  }}
                >
                  edit
                </button>
                <button
                  className="showDetails_delBtn"
                  onClick={function () {
                    deleteObject(l._id);
                  }}
                >
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Modal
          open={open}
          onClose={() => closeModal()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="div" component="div">
              <div>Update Order</div>
            </Typography>
            <Typography id="modal-modal-title" variant="div" component="div">
              <input
                className="title"
                type="text"
                placeholder={orderEditId.address}
                ref={addressRef}
              />
            </Typography>
            <Typography id="modal-modal-title" variant="div" component="div">
              <Button onClick={updateOrder} title="update" />
            </Typography>
          </Box>
        </Modal>
      </>
    );
}

export default ShowOrders;
