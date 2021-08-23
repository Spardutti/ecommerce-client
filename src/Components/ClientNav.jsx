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
    <div className="px-2 container">
      {user ? (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">{user.username}</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/#/">Products</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#/transactions/">Transactions</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#/categories">Categories</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="cart" href="/#/cart">
                    <i className="fas fa-shopping-cart"></i>
                    {cartItems && cartItems.length ? (
                      <div className="arrow">
                        <p>{cartItems.length}</p>
                      </div>
                    ) : null}
                  </NavLink>
                </NavItem>
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
          </Navbar>
        </div>
      ) : (
        <Navbar>
          <a href="/#/login" className="btn btn-primary">
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
