import React, { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";

//import ImgDumbMerch from "../assets/DumbMerch.png";
import smalldumbmerch from "../photo/smalldumbmerch.png";
import Product3 from "../photo/smalldumbmerch.png";

export default function Navbara(props) {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/register");
  };
  function nextto() {
    navigate("/category");
  }
  function stay() {
    navigate("/product");
  }
  function complainnavadmin() {
    navigate("/complainadmin");
  }
  function navroot() {
    navigate("/complainadmin");
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
            />
          </Navbar.Brand>
          <Nav className="me-auto; justify-content-end">
            <Nav.Link onClick={navroot}>Complain</Nav.Link>
            <Nav.Link onClick={nextto}>Category</Nav.Link>
            <Nav.Link onClick={stay} style={{ color: "red" }}>
              Product
            </Nav.Link>
            <Nav.Link onClick={logout}>LogOut</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
