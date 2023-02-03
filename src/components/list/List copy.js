import React from "react";
import Product from "../Product/Product";
import "./List.css";

const List2 = function ({ products }) {
  return (
    <div className="product_list">
      {products.map((product) => {
        return (
          <>
            <Product
              id={product._id}
              title={product.title}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          </>
        );
      })}
    </div>
  );
};

export default List2;
