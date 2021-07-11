import React, { useState, useContext } from "react";
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

export const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { user, setUser } = useContext(userContext);

  return (
    <div className="px-2">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">{user.username}</NavbarBrand>
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
