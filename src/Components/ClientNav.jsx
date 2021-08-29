import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../Context/Contexts";
import { logout } from "../API/API";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

// DISPLAY THE CLIENT NAV BAR

export const ClientNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggle = () => setIsOpen(!isOpen);

  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    if (user) {
      setCartItems(user.cart);
    }
  }, [user]);

  const logOut = async () => {
    await logout();
    setUser(null);
    setCartItems(null);
  };

  return (
    <div className="px-lg-2 container">
      {user ? (
        <div>
          <Navbar color="light" light expand="lg">
            <NavbarBrand className="px-1" href="/">
              Logo
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="d-flex w-100" navbar>
                <NavItem>
                  <NavLink href="/#/ecommerce-client/">Products</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#/ecommerce-client/transactions/">
                    Transactions
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#/ecommerce-client/categories">
                    Categories
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="cart" href="/#/ecommerce-client/cart">
                    <i className="fas fa-shopping-cart"></i>
                    {cartItems && cartItems.length ? (
                      <div className="arrow">
                        <p>{cartItems.length}</p>
                      </div>
                    ) : null}
                  </NavLink>
                </NavItem>
                {user ? <NavItem></NavItem> : null}
                {user ? (
                  <NavItem>
                    <NavLink
                      href="#"
                      onClick={() => {
                        logOut();
                      }}
                    >
                      Log out
                    </NavLink>
                  </NavItem>
                ) : null}
              </Nav>
            </Collapse>
            <h5 className="mx-5 pt-2">Hello, {user.username}</h5>
          </Navbar>
        </div>
      ) : (
        <Navbar>
          <a href="/#/ecommerce-client/login" className="btn btn-primary">
            Log in
          </a>
        </Navbar>
      )}
      <div className="home-title">
        <h1>Lorem</h1>
      </div>
    </div>
  );
};
