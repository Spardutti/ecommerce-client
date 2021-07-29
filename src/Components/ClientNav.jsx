import React, { useState, useContext } from "react";
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
  DropdownItem,
} from "reactstrap";
import { DropDownItems } from "./DropDownItems";

export const ClientNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { user, setUser } = useContext(userContext);

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
                  {user && user.cart.length ? (
                    <div className="arrow">
                      <p>{user.cart.length}</p>
                      <i className="fas fa-sort-down"></i>
                    </div>
                  ) : null}
                </div>
              </DropdownToggle>
              <DropdownMenu right className="drop-container">
                {user &&
                  user.cart.map((product, index) => {
                    return <DropDownItems key={index} />;
                  })}
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
