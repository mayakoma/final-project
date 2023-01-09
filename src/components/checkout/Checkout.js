import React from "react";
import Subtotal from "../Subtotal/Subtotal";
import { useStateValue } from "../../context/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import "./Checkout.css";

const Checkout = function () {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__main">
        <div className="checkout_products">
          {basket.map((item) => (
            <CheckoutProduct
              title={item.title}
              image={item.image}
              amount={item.amount}
              price={item.price}
              description={item.description}
              id={item.id}
            />
          ))}
        </div>
        <div className="checkout_subtotal">
          <Subtotal />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
