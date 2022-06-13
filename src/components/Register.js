import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Photoa from "../photo/DumbMerch.png";

import { API } from "../config/api";

function Register() {
  const navigate = useNavigate();
  function navigationToLogin() {
    navigate("/");
  }
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = value;
  const handleOnChangce = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    //console.log(e.target.value);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const body = JSON.stringify(value);

      const response = await API.post("/registration", body, config);
      navigate("/");
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
    }
  };

  return (
    <div className="bg-black">
      <Container>
        <Row className="vh-100 d-flex align-items-center">
          <Col md="6">
            <img
              src={Photoa}
              alt=""
              className="img-fluid"
              style={{ width: "278px", height: "264px" }}
            />
            <div className="style-big-text">Easy, Fast and Reliable</div>
            <p className="text-auth-parag mt-3">
              Go shopping for merchandise, just go to dumb merch <br />{" "}
              shopping. the biggest merchandise in Indonesia
            </p>
            <div className="mt-5">
              <Link to="/">
                <button
                  className="btn btn-login px-5 bg-danger"
                  style={{ color: "white" }}
                  onClick={navigationToLogin}
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  className="btn btn-register px-5"
                  style={{ color: "white" }}
                >
                  Register
                </button>
              </Link>
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-center">
              <div
                className="card-auth p-4"
                style={{ backgroundColor: "#181818" }}
              >
                <Form onSubmit={handleSubmit}>
                  <div
                    style={{
                      fontSize: "36px",
                      lineHeight: "49px",
                      fontWeight: "700",
                      color: "white",
                    }}
                  >
                    Register
                  </div>
                  <div className="mt-5 form">
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Control
                        onChange={handleOnChangce}
                        value={name}
                        name="name"
                        size="sm"
                        type="text"
                        placeholder="Enter Name"
                        className="px-3 py-2"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Control
                        onChange={handleOnChangce}
                        value={email}
                        name="email"
                        size="sm"
                        type="email"
                        placeholder="Enter Email"
                        className="px-3 py-2"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Control
                        onChange={handleOnChangce}
                        value={password}
                        name="password"
                        size="sm"
                        type="password"
                        placeholder="Enter Password"
                        className="px-3 py-2"
                      />
                    </Form.Group>
                  </div>
                  <div className="d-grid gap-2 mt-5">
                    <button
                      className="btn btn-login bg-danger"
                      type="submit"
                      style={{ color: "white" }}
                    >
                      Register
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
