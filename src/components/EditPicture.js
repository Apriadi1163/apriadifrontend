import React, { useState, useEffect, Profiler } from "react";
import NavbarCustomer from "../navbar/navbarCostumer";
import { API } from "../config/api";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";

function EditPicture() {
  const navigate = useNavigate();
  // const [state, dispatch] = useContext(UserContext)
  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: "",
    phone: "",
    gender: "",
    address: "",
  }); //Store product data

  const getCategories = async () => {
    try {
      const response = await API.get("/profiles");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
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
      formData.set("gender", form.name);
      formData.set("address", form.des);
      formData.set("image", form.price);

      console.log(formData);

      // Insert product data
      const response = await API.post("/profiles", formData, config);
      console.log(response);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="bg-black" style={{ height: "100vh" }}>
        <NavbarCustomer />
        <h1 style={{ textAlign: "center" }}>
          {" "}
          This Page will guide you to change your picture
        </h1>
        <form onSubmit={handleSubmit}>
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
                  // value={preview}
                  hidden
                  onChange={handleChange}
                />
              </label>
            </div>
            <div
              class="form-floating mb-3"
              style={{ marginRight: "2em", marginLeft: "2em" }}
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  placeholder="Phone"
                  value={form?.phone}
                />
              </Form.Group>
            </div>
            <div
              class="form-floating mb-3"
              style={{ marginRight: "2em", marginLeft: "2em" }}
            >
              <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  name="gender"
                  onChange={handleChange}
                  placeholder="Gender"
                  value={form?.gender}
                />
              </Form.Group>
            </div>

            <div
              class="form-floating mb-3"
              style={{ marginRight: "2em", marginLeft: "2em" }}
            >
              <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  onChange={handleChange}
                  placeholder="address"
                  value={form?.address}
                />
              </Form.Group>
            </div>
            <div
              class="d-grid gap-2 "
              style={{ marginRight: "2em", marginLeft: "2em" }}
            >
              <button class="btn btn-success" type="submit">
                Button
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditPicture;
