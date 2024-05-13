import { useEffect, useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

function App() {
  // const [auth, setAuth] = useState(false);
  // const [total, setTotal] = useState(0);
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
      if (cart.length >= MAX_ITEMS) return;
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

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            Guitars - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
