import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import Navbar from "../navbar/navbar";
import Product1 from "../photo/product1.png";
import Product2 from "../photo/product2.png";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import NavbarCustomer from "../navbar/navbarCostumer";

function Homepage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await API.get("/products");
      // Store product data to useState variabel
      setProducts(response.data.data);
      console.log(response.data.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="bg-black" style={{ height: "100vh" }}>
      <NavbarCustomer />
      <div>
        <h3 className="text-danger mt-5 mb-4" style={{ marginLeft: "120px" }}>
          Product
        </h3>
      </div>
      <Container>
        <Row>
          {products?.map((item, index) => (
            <Col md={3}>
              <Link
                to={`/detailproduct/${item.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Card
                  style={{ width: "23rem", textDecoration: "none" }}
                  className="bg-black me-2"
                >
                  <Card.Img
                    variant="top"
                    src={item.image}
                    className="img-fluid "
                    style={{ width: "150px", height: "200px" }}
                  />
                  <Card.Body>
                    <Card.Title style={{ color: "red" }}>
                      {item.name}
                    </Card.Title>
                    <Card.Text>{item.price}</Card.Text>
                    <Card.Text>Stock: {item.qty}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Homepage;
