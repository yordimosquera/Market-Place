import React from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import ButtonContainer from "./Button";

const Details = () => (
  <ProductConsumer>
    {(value) => {
      const {
        id,
        company,
        img,
        info,
        price,
        title,
        inCart,
      } = value.detailProduct;
      return (
        <div className="container py-5">
          <div className="row">
            <div className="col-10 mx-auto text-center text-slanded text-blue my-5">
              <h1>{title}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
              <img src={img} className="img-fluid" alt="product"></img>
            </div>
          </div>
          <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
            <h2>{`model: ${title}`}</h2>
            <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
              {"made by :"}
              <span className="text-uppercase">{company}</span>
            </h4>
            <h4 className="text-blue">
              <strong>
                {"price:"}
                <span>{" $"}</span>
                {price}
              </strong>
            </h4>
            <p className="text-capitalize font-weight-bold mt-3 mb-0">
              {"some info about product:"}
            </p>
            <p className="text-muted lead">{info}</p>
            <div>
              <Link to="/">
                <ButtonContainer>{"Back to products"}</ButtonContainer>
              </Link>
              <ButtonContainer
                onClick={() => {
                  value.addToCart(id);
                }}
                disabled={inCart}
                cart
              >
                {inCart ? "inCart" : "add to cart"}
              </ButtonContainer>
            </div>
          </div>
        </div>
      );
    }}
  </ProductConsumer>
);

export default Details;
