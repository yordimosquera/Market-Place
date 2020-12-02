import React, { Fragment } from "react";
import EmptyCart from "./EmptyCart";
import CartColumns from "./CartColumns";
import CartList from "./CartList";
import Title from "../Title";
import CartTotal from "./CartTotal";
import { ProductConsumer } from "../../context";

const Cart = (props) => {
  return (
    <section>
      <ProductConsumer>
        {(value) => {
          console.log(props);
          const { cart } = value;
          return cart.length > 0 ? (
            <Fragment>
              <Title name="your" title="cart" />
              <CartColumns />
              <CartList value={value} />
              <CartTotal value={value} />
            </Fragment>
          ) : (
            <EmptyCart />
          );
        }}
      </ProductConsumer>
    </section>
  );
};

export default Cart;
