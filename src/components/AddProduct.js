import React, { useContext, useState, useEffect } from "react";
import Product3 from "../photo/smalldumbmerch.png";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

import Navbara from "../navbar/navbar";

function AddProduct() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  function navigationToproduct() {
    navigate("/product");
  }
  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/register");
  };
  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: "",
    name: "",
    des: "",
    price: "",
    qty: "",
  }); //Store product data

  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("name", form.name);
      formData.set("des", form.des);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("categoryId", categoryId);

      console.log(form);

      // Insert product data
      const response = await API.post("/product", formData, config);
      console.log(response);

      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="bg-dark" style={{ height: "100vh" }}>
        <Navbara />
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                    alt="preview"
                  />
                </div>
              )}

              <div>
                <label
                  for="upload"
                  className="label-file-add-product"
                  style={{
                    backgroundColor: "red",
                    marginLeft: "2em",
                    borderRadius: "2em",
                    height: "2em",
                    color: "black",
                  }}
                >
                  Upload file
                  <input
                    type="file"
                    id="upload"
                    name="image"
                    hidden
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div
                class="form-floating mb-3"
                className="part-table"
                style={{ marginRight: "2em", marginLeft: "2em" }}
              >
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Product Name"
                  />
                </Form.Group>
              </div>
              <div
                class="form-floating my-3"
                style={{ marginRight: "2em", marginLeft: "2em" }}
              >
                <textarea
                  class="form-control"
                  style={{ resize: "none", height: "100px" }}
                  onChange={handleChange}
                  placeholder="Description"
                  id="floatingTextarea"
                  name="des"
                ></textarea>
                <label for="floatingTextarea">Description</label>
              </div>
              <div
                class="form-floating mb-2"
                style={{ marginRight: "2em", marginLeft: "2em" }}
              >
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    onChange={handleChange}
                    placeholder="Price (Rp.)"
                  />
                </Form.Group>
              </div>

              <div
                class="form-floating mb-2"
                style={{ marginRight: "2em", marginLeft: "2em" }}
              >
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="qty"
                    onChange={handleChange}
                    placeholder="Quantity"
                  />
                </Form.Group>
              </div>

              <div
                class="d-grid gap-2"
                style={{
                  marginRight: "2em",
                  marginLeft: "2em",
                  marginTop: "2em",
                }}
              >
                <button class="btn btn-success" type="submit">
                  Button
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
