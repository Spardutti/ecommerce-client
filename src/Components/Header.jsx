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

  const toggleModal = () => setModal(!modal);

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

  const DropDownMenu = () => {
    return (
      <div
        className={
          dropdown ? "dropdown-content-visible" : "dropdown-content-hidden"
        }
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    );
  };

  return (
    <div className="container header-container">
      <div className="logo">
        <img src={onlineShopping} alt="logo" />
      </div>
      <div className="cart">
        <p onClick={toggleModal}>
          <i className="fas fa-shopping-cart">
            {cartItems.length ? <span>{cartItems.length}</span> : null}
          </i>
        </p>
        <p className={cartTotal ? "header-total" : "hidden"}>
          $ {cartTotal.toLocaleString()}
        </p>
      </div>
      <div className="user" onClick={toggleDropdown}>
        <p>
          <i className="far fa-user"></i> Account
          <i className="fas fa-chevron-down"></i>
          <DropDownMenu />
        </p>
      </div>
      {modal ? <Cart modal={modal} toggle={toggleModal} /> : null}
    </div>
  );
};
