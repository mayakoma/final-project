import Button from "../Button/Button";
import React from "react";
import { useHttpClient } from "../../Hook/HttppHook";

function ShowOrders({ list }) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
    } catch (err) {}
  };

  if (!list || list == [] || list.length === 0) return null;
  else
    return (
      <ul className="showOrders">
        {list.map((l, i) => (
          <li key={i} className="showOrders_orderItem">
            <div className="showOrders_info">
              <p>
                <strong>Order Number:</strong> {l.orderDetailes._id}
              </p>
              <p>
                <strong>Date: </strong>
                {l.orderDetailes.orderDate}
              </p>
              <p>
                {" "}
                <strong>Address: </strong>
                {l.orderDetailes.address}
              </p>
              <p>
                {" "}
                <strong>Total Price: </strong>
                {l.orderDetailes.totalPrice}
              </p>
            </div>
            <div className="ShowDetails_btns">
              <button className="showDetails_delBtn">edit</button>
              <button
                className="showDetails_delBtn"
                onClick={function () {
                  deleteObject(l.orderDetailes._id);
                }}
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
}

export default ShowOrders;
