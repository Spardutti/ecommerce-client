import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../../Context/Contexts";
import { logout } from "../../API/API";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

/* DISPLAY THE ADMIN NAV BAR, WITH LINKS TO SELLS, CATEGORIES AND 
PRODUCTS LINKS */

export const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { user, setUser } = useContext(userContext);

  return (
    <div className="px-2 container">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/#/admin-productos">{user.username}</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/#/admin-ventas">Ventas</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/admin-categorias">Categorias</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/#/admin-productos">Productos</NavLink>
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
