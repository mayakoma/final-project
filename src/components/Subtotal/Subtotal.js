import React from "react";
import { useStateValue } from "../../context/StateProvider";
import { getBasketTotal } from "../../context/reducer";
import { getBasketItemAmount } from "../../context/reducer";
import { initialState } from "../../context/reducer";
import "./Subtotal.css";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <p>
        Subtotal ({getBasketItemAmount(basket)} items):{" "}
        <strong>$ {getBasketTotal(basket).toFixed(2)}</strong>
      </p>
    </div>
  );
}

export default Subtotal;
