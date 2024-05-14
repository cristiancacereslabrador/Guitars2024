import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { db } from "../data/db";

const useCart = () => {
  // return <div></div>;
  // console.log("desde useCart");
  // const auth = true;
  // const carrito = [];
  // console.log("auth", auth);
  // console.log("carrito", carrito);
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;
  // useEffect(() => {
  //   setData(db);
  // }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemsExists = cart.findIndex((guitar) => guitar.id === item.id);
    // console.log("item?", item);
    if (itemsExists >= 0) {
      if (cart[itemsExists].quantity >= MAX_ITEMS) return;
      //Ya existe en el carrito
      const updatedCart = [...cart];
      updatedCart[itemsExists].quantity++;
      console.log("Ya existe...");
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }
  function removeFromCart(id) {
    // console.log("eliminando...", id);
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function decreaseQuantity(id) {
    // console.log("decrementando...", id);
    const updatedCart = cart.map((item) => {
      // console.log("item.id", item.id);
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    // console.log("objeto retornado", updatedCart);
    setCart(updatedCart);
  }
  function increaseQuantity(id) {
    // console.log("id", id);
    // console.log("incrementando", id);
    // console.log("objetoInicial", cart);
    const updatedCart = cart.map((item) => {
      // console.log("item.id", item.id);
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    // console.log("objeto retornado", updatedCart);
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};

export default useCart;
