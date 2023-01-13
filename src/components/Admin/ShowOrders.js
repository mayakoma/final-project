import Button from "../Button/Button";
import React from "react";

function ShowOrders({ list }) {
  return (
    <ul className="showDetails">
      {list.map((l, i) => (
        <li key={i} className="showDetails_userItem">
          <div className="showDetails_info">
            <p>orderNumber: {l.orderDetailes._id}</p>
            <p>Date: {l.orderDetailes.orderDate}</p>
            <p>address: {l.orderDetailes.address}</p>
            <p>total Price: {l.orderDetailes.totalPrice}</p>
          </div>
          <p className="ShowDetails_btns">
            <button className="showDetails_btn">edit</button>
            <button className="showDetails_btn">delete</button>
          </p>
        </li>
      ))}
    </ul>
  );
}

export default ShowOrders;
