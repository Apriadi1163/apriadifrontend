import React, { useState, useEffect } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import Product3 from "../photo/smalldumbmerch.png";
import Product1 from "../photo/product1.png";
import NavbarCustomer from "../navbar/navbarCostumer";
import { useParams, useNavigate } from "react-router-dom";

import { API } from "../config/api";
function Detailproduct() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  const getProduct = async () => {
    try {
      const response = await API.get("/product/" + id);
      // Store product data to useState variabel
      setProduct(response.data.data);
      console.log(response.data.data);
      //console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, []);

  //format currency

  //create config snap payment
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-X3GsqPW5RR2N2-UD";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = async () => {
    try {
      const data = {
        idProduct: product.id,
        idSeller: product.user.id,
        price: product.price,
      };
      const body = JSON.stringify(data);

      //configuration
      const config = {
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
      };
      // Insert transaction data
      const response = await API.post("/transaction", body, config);
      console.log("Response Transaction: ", response.data.payment.token);

      // Create variabel for store token payment from response
      const token = response.data.payment.token;

      // Modify handle buy to display Snap payment page
      // //? dokumentasi midtrans
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bg-black" style={{ height: "100vh" }}>
        <NavbarCustomer />
        <Container>
          <Row md="12">
            <Col md="3" className="style-photo-detail">
              <img src={product?.image} className="img-fluid" />
            </Col>
            <Col md="5" className="description-detail">
              <div
                className="color-black"
                style={{ color: "red", fontSize: "2em" }}
              >
                {product.name}
              </div>
              <div className="text-content-product-detail">
                Stock : {product.qty}
              </div>
              <p className="text-content-product-detail mt-4 ">
                deskripsi: {product.des}
              </p>
              <div className="text-price-product-detail text-end mt-4">
                Price: {product.price}
              </div>
              <div className="d-grid gap-2 mt-5">
                <button
                  onClick={handleBuy}
                  className="btn btn-buy"
                  style={{ backgroundColor: "red", color: "black" }}
                >
                  Buy
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Detailproduct;
