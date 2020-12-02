import React, { createContext, useState } from "react";
import { storeProducts, detailProduct } from "./data";
const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({
    products: storeProducts,
    detailProduct,
  });
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState({});
  const [cartValues, setCartValues] = useState({
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
  });

  const getItem = (id) => products.products.find((item) => item.id === id);

  const handleDetail = (id) => {
    const product = getItem(id);
    setProducts({ detailProduct: product, products: products.products });
  };

  const openModal = (id) => {
    const product = getItem(id);
    setModalOpen(true);
    setModalProduct(product);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const addToCart = (id) => {
    let tempProducts = products.products;

    const index = tempProducts.indexOf(getItem(id));

    const product = tempProducts[index];
    console.log({ product, index, tempProducts });
    product.inCart = true;
    product.count = 1;

    const price = product.price;
    product.total = price;
    setProducts({ ...products, products: tempProducts });
    setCart([...cart, product]);
    addTotals();
  };

  const clearCart = () => {
    setCart([]);
    setProducts();
    addTotals();
  };

  const addTotals = () => {
    let subtotal = 0;
    cart.map((item) => (subtotal += item.total));
    const tempTax = subtotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = tax + subtotal;
    setCartValues({
      cartSubtotal: subtotal,
      cartTax: tax,
      cartTotal: total,
    });
  };

  const removeItem = (id) => {
    const tempCart = cart.filter((item) => item.id !== id);
    const productIndex = products.indexOf(getItem(id));
    const removedProduct = products[productIndex];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    setCart(tempCart);
  };

  const increment = (id) => {
    const selectedProduct = cart.find((item) => item.id === id);
    const productIndex = cart.indexOf(selectedProduct);
    const product = cart[productIndex];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    addTotals();
  };

  const decrement = (id) => {
    const selectedProduct = cart.find((item) => item.id === id);
    const productIndex = cart.indexOf(selectedProduct);
    const product = cart[productIndex];
    product.count = product.count - 1;
    if (product.count === 0) {
      removeItem(id);
    } else {
      product.total = product.count * product.price;
      addTotals();
    }
  };

  return (
    <ProductContext.Provider
      value={{
        ...products,
        handleDetail,
        addToCart,
        openModal,
        closeModal,
        modalOpen,
        modalProduct,
        cart,
        clearCart,
        removeItem,
        increment,
        decrement,
        ...cartValues,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
