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

/* DISPLAY THE ADMIN NAV BAR, WITH LINKS TO SELLS, CATEGORIES AND 
PRODUCTS LINKS */

export const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { user, setUser } = useContext(userContext);

  const logOut = async () => {
    await logout();
    setUser(null);
    window.location.replace("/ecommerce-client/");
  };

  return (
    <div className="px-2 container">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/ecommerce-client/#/admin-productos">
          {user.username}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/ecommerce-client/#/admin-transactions">
                Transactions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/ecommerce-client/#/admin-categorias">
                Categories
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/ecommerce-client/#/admin-productos">
                Products
              </NavLink>
            </NavItem>
            {user ? (
              <NavItem>
                <NavLink href="#" onClick={logOut}>
                  Log out
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
