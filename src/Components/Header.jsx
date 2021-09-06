import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../Context/Contexts";
import { logout } from "../API/API";
import { Link } from "react-router-dom";
import onlineShopping from "../assets/Online_shopping_PNG.png";
import { Cart } from "./Cart";
import "../Styles/header.css";
import openShop from "../assets/open-shop.jpg";

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

  // USER DROPDOWN
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

  // LOGIN BUTTON
  const Login = () => {
    return (
      <div className="user-nav">
        <Link to="/login">Log in</Link>
      </div>
    );
  };

  // TITLE
  const Title = () => {
    return (
      <div className="title-container">
        {/*  <img src={openShop} alt=" by Mike Petrucci on Unsplash" /> */}
        <h1>Your Market Name</h1>
      </div>
    );
  };

  return (
    <div className="">
      <div className=" header-container">
        <div className="logo">
          <Link to="/">
            <img src={onlineShopping} alt="logo" />
          </Link>
        </div>
        <div className="cart-user-container">
          <div className="cart-nav" onClick={toggleModal}>
            <i className="fas fa-shopping-cart"></i>
            <i className={cartTotal ? "header-total" : "hidden"}>
              $ {cartTotal.toLocaleString()}
            </i>
            {user && user.cart.length ? (
              <span className="cart-length">{user.cart.length}</span>
            ) : null}
          </div>
          {user ? <UserNav /> : <Login />}
          {modal ? <Cart modal={modal} toggle={toggleModal} /> : null}
        </div>
      </div>
      <Title />
    </div>
  );
};
