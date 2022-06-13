import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Navbar,
  Nav,
  Row,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import Componentcategory from "../data/Componentcategory";
import { useNavigate, Link } from "react-router-dom";
import Product3 from "../photo/smalldumbmerch.png";
import { API } from "../config/api";
import DeleteData from "../modal/delete";
import Navbara from "../navbar/navbar";
import { UserContext } from "../context/userContext";

function Category() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/register");
  };
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [category, setCategory] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function navigationEditCategory() {
    navigate("/edit");
  }
  function navigationAdd() {
    navigate("/addcategory");
  }

  const [modalShow, setModalShow] = React.useState(false);

  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      // Store product data to useState variabel
      setCategory(response.data.data.categories);
      console.log(response.data.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };
  const deleteById = async (id) => {
    try {
      await API.delete(`/category/${id}`);
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };
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
      <Navbara />
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
          <h3 className="list-category">List Category</h3>
        </div>
        <Button
          onClick={navigationAdd}
          variant="dark"
          style={{ width: "135px" }}
        >
          Add category
        </Button>{" "}
      </div>
      <container>
        <Row className="table-category">
          {category?.length != 0 ? (
            <Table
              striped
              bordered
              hover
              variant="dark"
              style={{ marginTop: "2em" }}
            >
              <thead>
                <tr>
                  <th className="mx-4">No</th>
                  <th>Category Name</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {category.map((item, index) => (
                  <tr>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">{item.name}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Link to={`/edit/${item.id}`}>
                        <Button
                          className="btn-sm btn-success me-2"
                          style={{ width: "135px", justifyContent: "center" }}
                        >
                          Edit
                        </Button>
                      </Link>

                      <Button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                        className="btn-sm btn-danger me-2"
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

export default Category;

<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>

    <tr>
      <td>3</td>
      <td colSpan={2}>Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>;
