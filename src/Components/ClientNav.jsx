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

  return (
    <div className="px-2 container">
      <Navbar color="light" light expand="md">
        {user ? (
          <NavbarBrand href="/">{user.username}</NavbarBrand>
        ) : (
          <a href="/#/login" className="btn btn-primary">
            Log in
          </a>
        )}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/#/">Products</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/transactions/">Compras</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/categorias">Categorias</NavLink>
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
                    logout();
                    setUser(null);
                  }}
                >
                  Salir
                </NavLink>
              </NavItem>
            ) : null}
          </Nav>
        </Collapse>
      </Navbar>
      <div className="home-title">
        <h1>Lorem</h1>
      </div>
    </div>
  );
};
