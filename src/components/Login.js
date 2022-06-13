import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import Photoa from "../photo/DumbMerch.png";
function Login() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  function entryhome() {
    navigate("/homepage");
  }

  function navigationToRegister() {
    navigate("/register");
  }
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Create Configuration Content-type here ...
      // Content-type: application/json
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Convert form data to string here ...
      const body = JSON.stringify(form);

      // Insert data user for login process here ...
      const response = await API.post("/login", body, config);
      console.log(response.data.data.token);
      console.log(response);
      //Checking process
      if (response?.status == 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        if (response.data.data.status == "admin") {
          navigate("/product");
        } else {
          navigate("/homepage");
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <div className="bg-black">
      <Container>
        <Row className="vh-100 d-flex align-items-center">
          <Col md="6">
            <img
              src={Photoa}
              className="img-fluid"
              alt=""
              style={{ width: "264px", height: "264px" }}
            />
            <div className="style-big-text">Easy, Fast and Reliable</div>
            <p className="text-auth-parag mt-3">
              Go shopping for merchandise, just go to dumb merch <br />{" "}
              shopping. the biggest merchandise in <b>Indonesia</b>
            </p>
            <div className="mt-5">
              <button className="btn-btn-login">Login</button>
              <button
                className="btn-btn-register"
                onClick={navigationToRegister}
              >
                Register
              </button>
            </div>
          </Col>
          <Col>
            <form onSubmit={handleSubmit}>
              <div className="form-blog-login">
                <div
                  className="card-auth p-4 "
                  style={{ backgroundColor: "#181818" }}
                >
                  <div
                    style={{
                      fontSize: "36px",
                      lineHeight: "49px",
                      fontWeight: "700",
                      color: "white",
                    }}
                  >
                    Login
                  </div>
                  <div className="mt-5 form">
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={handleChange}
                        className="px-3 py-2 mt-3"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        name="password"
                        onChange={handleChange}
                        className="px-3 py-2 mt-3"
                      />
                    </div>
                  </div>
                  <div className="d-grid gap-2 mt-5">
                    <button className="btn btn-login bg-danger">Login</button>
                  </div>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
