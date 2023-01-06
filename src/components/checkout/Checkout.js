import React from "react";
import Subtotal from "../Subtotal/Subtotal";

const Checkout = function () {
  return (
    <div className="checkout">
      <div className="checkout_product"></div>
      <div className="checkout_subtotal">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
