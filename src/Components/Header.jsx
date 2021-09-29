import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../Context/Contexts";
import { logout } from "../API/API";
import { Link } from "react-router-dom";
import onlineShopping from "../assets/Online_shopping_PNG.png";
import { Cart } from "./Cart";
import { LoginScreen } from "./LoginScreen";

// DISPLAY THE CLIENT NAV BAR

export const Header = () => {
  const [cartItems, setCartItems] = useState([]);
  const [dropdown, setDropwdown] = useState(false);
  const [cartTotal, setCartTotal] = useState("");
  const [login, setLogin] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartModal = () => {
    setIsCartOpen(!isCartOpen);
    setDropwdown(false);
  };

  const toggleDropdown = () => setDropwdown(!dropdown);

  const { user, setUser } = useContext(userContext);

  // GET CART ITEMS
  useEffect(() => {
    if (user) {
      setCartItems(user.cart);
    }
  }, [user]);

  // CART ITEMS TOTAL
  useEffect(() => {
    let total = 0;
    cartItems &&
      cartItems.map((elem) => {
        total += elem.price * elem.quantity;
      });
    setCartTotal(total);
  }, [cartItems]);

  // LOGOUT
  const logOut = async () => {
    await logout();
    setUser(null);
    setCartItems(null);
  };

  // USER DROPDOWN
  const UserNav = () => {
    return dropdown ? (
      <div className="user-nav-show grow ">
        <p onClick={toggleDropdown} className="user-name">
          {user.username} <i className="fas fa-caret-up"></i>
        </p>
        <p
          onClick={() => {
            toggleCartModal();
            toggleDropdown();
          }}
        >
          Cart
        </p>
        <p onClick={toggleDropdown}>Transactions</p>
        <p
          onClick={() => {
            setIsCartOpen(false);
            toggleDropdown();
            logOut();
          }}
        >
          Log out
        </p>
      </div>
    ) : (
      <div className="user-nav nav-buttons">
        <p onClick={toggleDropdown}>
          Account <i className="fas fa-caret-down"></i>{" "}
        </p>
      </div>
    );
  };

  // LOGIN BUTTON
  const Login = () => {
    return (
      <p className="user-nav nav-buttons" onClick={() => setLogin(true)}>
        Log in
      </p>
    );
  };

  // TITLE
  const Title = () => {
    return (
      <div className="title-container">
        <h1>EcommercE</h1>
      </div>
    );
  };

  return (
    <div className="">
      <div className=" header-container">
        <div className="cart-user-container">
          <div className="cart-nav nav-buttons" onClick={toggleCartModal}>
            <i className="fas fa-shopping-cart"></i>
            <i className={cartTotal ? "header-total" : "hidden"}>
              $ {cartTotal.toLocaleString()}
            </i>
            {user && user.cart.length ? (
              <span className="cart-length">{user.cart.length}</span>
            ) : null}
          </div>
          {user ? <UserNav /> : <Login />}
        </div>
      </div>
      <Title />
      {login ? <LoginScreen setLogin={setLogin} /> : null}
      {isCartOpen ? <Cart setIsCartOpen={setIsCartOpen} /> : null}
    </div>
  );
};
