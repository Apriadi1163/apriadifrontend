import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarCustomer from "../navbar/navbarCostumer";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import picture from "../photo/picture.png";
import small from "../photo/smalldumbmerch.png";

function Profil() {
  const [state] = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();

  const navigationEditProf = (id) => {
    navigate("/editpicture");
  };

  const getTransactions = async () => {
    try {
      const response = await API.get("/transactions");
      setTransactions(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getTransactions();
  }, []);
  console.log(transactions);
  return (
    <div className="bg-black" style={{ height: "100vh" }}>
      <NavbarCustomer />

      <Container className="mt-5">
        <Row>
          <Col md="12">
            <div
              className="text-header-product mb-4 "
              style={{ color: "red", width: "120px" }}
            >
              My Profile
            </div>
            <Row>
              <Col md="3">
                <img
                  src={profile?.image ? profile.image : picture}
                  // src={profile.image}
                  className="img-fluid rounded"
                  alt="avatar"
                />
              </Col>
              <Col md="3" style={{ color: "white" }}>
                <div className="profile-header" style={{ color: "red" }}>
                  Name
                </div>
                <div>{state.user.name}</div>

                <div className="profile-header" style={{ color: "red" }}>
                  Email
                </div>
                <div>{state.user.email}</div>

                <div className="profile-header" style={{ color: "red" }}>
                  Phone
                </div>
                <div>{profile?.phone ? profile?.phone : "-"}</div>

                <div className="profile-header" style={{ color: "red" }}>
                  Gender
                </div>
                <div>{profile?.gender ? profile?.gender : "-"}</div>

                <div className="profile-header" style={{ color: "red" }}>
                  Address
                </div>
                <div>{profile?.address ? profile?.address : "-"}</div>
              </Col>
              <Col md="6">
                <div
                  className="text-header-product mb-3 "
                  style={{ color: "red", width: "120px" }}
                >
                  My Transaction
                </div>

                {transactions?.map((item, index) => (
                  <Container
                    key={index}
                    style={{ padding: "12px 28px", backgroundColor: "#303030" }}
                  >
                    <Row>
                      <Col xs="3" style={{ padding: "0px" }}>
                        <img
                          src={item.product.image}
                          alt="img"
                          className="img-fluid"
                          style={{
                            height: "80px",
                            width: "80px",
                            objectfit: "cover",
                          }}
                        />
                      </Col>
                      <Col xs="6">
                        <div
                          style={{
                            fontSize: "18px",
                            color: "F74D4D",
                            fontWeight: "500",
                            lineHeight: "19px",
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          className="mt-2"
                          style={{
                            fontSize: "14px",
                            fontWeight: "300",
                            color: "#FFFFFF",
                          }}
                        >
                          Price : {item.price}
                        </div>
                        <div
                          className="mt-4"
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#FFFFFF",
                          }}
                        >
                          Sub Total : {item.price}
                        </div>
                      </Col>
                      <Col xs="3" style={{ padding: "0px" }}>
                        <img
                          src={small}
                          alt="img"
                          className="img-fluid"
                          style={{
                            maxHeight: "70px",
                            marginTop: "10px",
                          }}
                        />
                      </Col>
                    </Row>
                  </Container>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profil;
