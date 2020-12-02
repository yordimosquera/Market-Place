import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import ButtonContainer from "./Button";

const Modal = () => (
  <ProductConsumer>
    {(value) => {
      const { modalOpen, closeModal, addToCart } = value;
      const { img, title, price, id } = value.modalProduct;
      console.log({ value });
      if (!modalOpen) {
        return null;
      } else {
        return (
          <ModalContainter>
            <div className="container">
              <div className="row">
                <div
                  id="modal"
                  className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
                >
                  <h5>{"Item added to the cart"}</h5>
                  <img src={img} className="img-fluid" alt="product" />
                  <h5>{title}</h5>
                  <h5 className="ext-muted">{`price : $ ${price}`}</h5>
                  <Link to="/">
                    <ButtonContainer onClick={() => closeModal()}>
                      {"Store"}
                    </ButtonContainer>
                  </Link>
                  <Link to="/cart">
                    <ButtonContainer
                      cart
                      onClick={() => {
                        addToCart(id);
                        closeModal();
                      }}
                    >
                      {"Go to cart"}
                    </ButtonContainer>
                  </Link>
                </div>
              </div>
            </div>
          </ModalContainter>
        );
      }
    }}
  </ProductConsumer>
);

const ModalContainter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;

export default Modal;
