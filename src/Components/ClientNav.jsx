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
  Col,
  Row,
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
        <Row className="bg-light ">
          <Col xs={6} md={8}>
            <Navbar light expand="md">
              <NavbarBrand className="px-1" href="/ecommerce-client/">
                Logo
              </NavbarBrand>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav navbar>
                  <NavItem>
                    <NavLink href="/ecommerce-client/#/">Products</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/ecommerce-client/#/transactions/">
                      Transactions
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/ecommerce-client/#/categories">
                      Categories
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
          </Col>
          <Col>
            <Navbar light expand="xs">
              <Nav navbar>
                <NavItem>
                  <NavLink>Hello, {user.username}</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="cart" href="/ecommerce-client/#/cart">
                    <i className="fas fa-shopping-cart"></i>
                    {cartItems && cartItems.length ? (
                      <div className="arrow">
                        <p>{cartItems.length}</p>
                      </div>
                    ) : null}
                  </NavLink>
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
        </Row>
      ) : (
        <Navbar>
          <a href="/ecommerce-client/#/login" className="btn btn-primary">
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
