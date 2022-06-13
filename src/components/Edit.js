import React, { useState, useEffect } from "react";
import Product3 from "../photo/smalldumbmerch.png";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";

function Edit() {
  const navigate = useNavigate();
  function navigationSave() {
    navigate("/category");
  }
  const { id } = useParams();
  console.log(id);
  const [category, setCategory] = useState({ name: "" });

  const getCategory = async (id) => {
    try {
      const response = await API.get("/category/" + id);
      setCategory({ name: response.data.data.name });
      console.log(setCategory);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(category);

      const response = await API.patch("/category/" + id, body, config);
      console.log(response.data);
      navigate("/category");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory(id);
  }, []);
  return (
    <div>
      <div className="bg-black" style={{ height: "100vh" }}>
        {
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
                <Nav.Link href="#">Complain</Nav.Link>
                <Nav.Link href="/category">Category</Nav.Link>
                <Nav.Link href="/product">Product</Nav.Link>
                <Nav.Link href="/">LogOut</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        }
        <div>
          <h3 className="edit-category-label">Edit Category</h3>
        </div>
        <form className="mt-5 form" onSubmit={handleSubmit}>
          <div d-grid gap-2 mt-5>
            <input
              placeholder="Edit"
              value={category.name}
              className="edit-place"
              onChange={handleChange}
            />
          </div>

          <div className="d-grid gap-2 mt-5">
            <button className="edit-button-save">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
