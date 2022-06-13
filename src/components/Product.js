import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import {
  Container,
  Navbar,
  Nav,
  Row,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import Componentproduct from "../data/Componentproduct";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";
import noimg from "../photo/empty.svg";
import ShowMoreText from "react-show-more-text";
import Product3 from "../photo/smalldumbmerch.png";
import Navbara from "../navbar/navbar";
import DeleteData from "../modal/delete";

function Product() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  function navigationEditproduct() {
    navigate("/editproduct");
  }
  function navigationToAdd() {
    navigate("/addproduct");
  }
  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/register");
  };

  const [products, setProducts] = useState([]);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Create init useState & function for handle show-hide modal confirm here ...
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetching product data from database
  const getProducts = async () => {
    try {
      const response = await API.get("/products");
      // Store product data to useState variabel
      setProducts(response.data.data);
      console.log(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/editproduct/${id}`);
  };

  // Create function handle get id product & show modal confirm delete data here ...
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = async (id) => {
    try {
      await API.delete(`/product/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Call function for handle close modal and execute delete data with useEffect here ...
  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <div className="bg-black" style={{ height: "100vh" }}>
      <div className="bg-black">
        <Navbara />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginInlineEnd: "250px",
          height: "2em",
          marginTop: "1em",
        }}
      >
        <div>
          <h3 className="list-product-label">List Product</h3>
        </div>
        <Button
          onClick={navigationToAdd}
          variant="dark"
          style={{ width: "10%", paddingBottom: "20px 16px" }}
          className="btn-sm btn-success me-2"
        >
          Add Product
        </Button>{" "}
      </div>
      <container>
        <Row className="table-product">
          {products?.length != 0 ? (
            <Table
              striped
              hover
              size="lg"
              variant="dark"
              style={{ marginTop: "2em" }}
            >
              <thead>
                <tr>
                  <th width="1%" className="text-center">
                    No
                  </th>
                  <th>Photo</th>
                  <th style={{ textAlign: "center" }}>Product Name</th>
                  <th>Product Desc</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item, index) => (
                  <tr>
                    <td className="align-middle text-center">{index + 1}</td>
                    <td className="align-middle">
                      <img
                        src={item.image}
                        style={{
                          width: "50px",
                          height: "50px",
                          // objectFit: "cover",
                        }}
                      />
                    </td>
                    <td className="align-middle">{item.name}</td>
                    <td className="align-middle">{item.des}</td>
                    <td className="align-middle">{item.price}</td>
                    <td className="align-middle">{item.qty}</td>
                    <td className="align-middle">
                      <Button
                        className="btn-sm btn-success me-2"
                        style={{ width: "135px" }}
                        onClick={() => handleUpdate(item.id)}
                      >
                        {" "}
                        Edit
                      </Button>

                      <Button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                        variant="danger"
                        className="btn-sm btn-success me-2"
                        style={{ width: "135px" }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center pt-5">
              <div className="mt-3">No data product</div>
            </div>
          )}
        </Row>
      </container>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
}

export default Product;
