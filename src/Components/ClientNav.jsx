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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
} from "reactstrap";
import { DropDownItems } from "./DropDownItems";

export const ClientNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggle = () => setIsOpen(!isOpen);

  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    if (user) {
      let cart = user.cart;
      console.log(cart);
      let products = [];
      // CREATE A NEW ENTRY FOR EACH DETAIL THE PRODUCT HAVE
      for (let item of cart) {
        for (let detail of item.details) {
          products.push({
            name: item.name,
            detail,
            images: item.images[0],
            id: item._id,
          });
        }
      }
      setCartItems(products);
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
              <NavLink href="/#/compras/">Compras</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/categorias">Categorias</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <div className="cart">
                  <i className="fas fa-shopping-cart"></i>
                  {cartItems && cartItems.length ? (
                    <div className="arrow">
                      <p>{cartItems.length}</p>
                      <i className="fas fa-sort-down"></i>
                    </div>
                  ) : null}
                </div>
              </DropdownToggle>
              <DropdownMenu right>
                {user &&
                  cartItems.map((product, index) => {
                    return <DropDownItems product={product} index={index} />;
                  })}
                <div className="text-center mt-2">
                  <Button className="bg-primary" href="/#/">
                    Go to cart
                  </Button>
                </div>
              </DropdownMenu>
            </UncontrolledDropdown>
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
