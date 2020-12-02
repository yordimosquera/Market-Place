import React, { useState, Fragment } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../context";

const ProductList = () => {
  return (
    <Fragment>
      <div className="py-5 container">
        <Title name="Our" title="Products" />
        <div className="row">
          <ProductConsumer>
            {(value) =>
              value.products.map((product) => (
                <Product key={product.id} product={product} />
              ))
            }
          </ProductConsumer>
        </div>
      </div>
      {/* <Product /> */}
    </Fragment>
  );
};

export default ProductList;
