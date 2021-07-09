import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router";
import { tokenContext } from "../Context/Contexts";
import { userData } from "../API/API";
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

export const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const user = useContext(tokenContext);

  useEffect(() => {
    console.log("hits one");
    userData();
  }, []);

  return (
    <div className="px-2">
      <Navbar color="light" light expand="md">
        {user ? (
          <NavbarBrand href="/">User</NavbarBrand>
        ) : (
          <a
            href="http://localhost:5000/user/google/login"
            className="btn btn-primary"
          >
            Log in
          </a>
        )}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/#/compras/">Compras</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                Categorias
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Cart
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Comprar</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
