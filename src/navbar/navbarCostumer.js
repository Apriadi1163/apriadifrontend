import React, { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";

//import ImgDumbMerch from "../assets/DumbMerch.png";
import smalldumbmerch from "../photo/smalldumbmerch.png";
import Product3 from "../photo/smalldumbmerch.png";

export default function NavbarCustomer(props) {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/register");
  };
  function goto() {
    navigate("/profile");
  }

  function navrootbe() {
    navigate("/complain");
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/homepage">
            <img
              alt=""
              src={Product3}
              width="60"
              height="60"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Nav className="me-auto; justify-content-end">
            <Nav.Link onClick={navrootbe}>Complain</Nav.Link>
            <Nav.Link onClick={goto}>Profil</Nav.Link>
            <Nav.Link onClick={logout}>LogOut</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
