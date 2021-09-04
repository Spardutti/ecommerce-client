import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../Context/Contexts";
import { logout } from "../API/API";
import { Link } from "react-router-dom";
import onlineShopping from "../assets/Online_shopping_PNG.png";
import { Cart } from "./Cart";
import "../Styles/header.css";

// DISPLAY THE CLIENT NAV BAR

export const Header = () => {
  const [cartItems, setCartItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [dropdown, setDropwdown] = useState(false);
  const [cartTotal, setCartTotal] = useState("");

  const toggleModal = () => {
    setModal(!modal);
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

  const UserNav = () => {
    return dropdown ? (
      <div className="user-nav-show fadeIn ">
        <p onClick={toggleDropdown}>{user.username}</p>
        <p onClick={toggleModal}>Cart</p>
        <p>Transactions</p>
        <p onClick={logOut}>Log out</p>
      </div>
    ) : (
      <div className="user-nav">
        <p onClick={toggleDropdown}>Account</p>
      </div>
    );
  };

  const Login = () => {
    return (
      <div className="user-nav">
        <p>Log in</p>
      </div>
    );
  };

  return (
    <div className="container header-container">
      <div className="logo">
        <img src={onlineShopping} alt="logo" />
      </div>
      <div className="cart-user-container">
        <div className="cart-nav" onClick={toggleModal}>
          <i className="fas fa-shopping-cart"></i>
          <i className={cartTotal ? "header-total" : "hidden"}>
            $ {cartTotal.toLocaleString()}
          </i>
        </div>
        {user ? <UserNav /> : <Login />}
        {modal ? <Cart modal={modal} toggle={toggleModal} /> : null}
      </div>
    </div>
  );
};
