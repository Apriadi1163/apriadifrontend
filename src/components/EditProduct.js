import React, { useContext, useState, useEffect } from "react";
import Product3 from "../photo/smalldumbmerch.png";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

import Navbara from "../navbar/navbar";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  function navigationToproduct() {
    navigate("/product");
  }

  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({}); //Store product data
  const [form, setForm] = useState({
    image: "",
    name: "",
    des: "",
    price: "",
    qty: "",
  }); //Store product data

  const getProduct = async (id) => {
    try {
      const response = await API.get("/product/" + id);
      console.log(response.data.data);
      // Store product data to useState variabel
      setPreview(response.data.data.image);
      setForm({
        ...form,
        name: response.data.data.name,
        des: response.data.data.des,
        price: response.data.data.price,
        qty: response.data.data.qty,
      });
      setProduct(response.data.data);
      // console.log(response.data.data.product);

      //console.log(response.data.data.products);
      // console.log(response.data.data.products.name);
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
      // console.log(handleSubmit);

      // Store data with FormData as object
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("des", form?.des);
      formData.append("price", form?.price);
      formData.append("qty", form?.qty);
      if (form.image) {
        formData.append("image", form?.image[0], form?.image[0]?.name);
      }
      for (let p of formData) {
        console.log(p);
      }
      //formData.set("categoryId", categoryId);
      // console.log(formData);

      // Object.keys(formData).map((item) => console.log(item));

      const response = await API.patch(
        "/product/" + product.id,
        formData,
        config
      );
      console.log(response.data);

      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // getCategories();
    getProduct(id);
  }, []);
  // useEffect(() => {
  //   const newCategoryId = product?.categories?.map((item) => {
  //     return item.id;
  //   });

  //   setCategoryId(newCategoryId);
  // }, [product]);

  // console.log(product);
  return (
    <>
      <div className="bg-dark" style={{ height: "100vh" }}>
        <Navbara />
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
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Product Name"
                  value={form?.name}
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
                value={form?.des}
              ></textarea>
              <label for="floatingTextarea">Description</label>
            </div>
            <div
              class="form-floating mb-3"
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
                  value={form?.price}
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
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="qty"
                  onChange={handleChange}
                  placeholder="Quantity"
                  value={form?.qty}
                />
              </Form.Group>
            </div>
            {/* <div className="card-form-input mt-4 px-2 py-1 pb-2">
                <div
                  className="text-secondary mb-1"
                  style={{ fontSize: "15px" }}
                >
                  Category
                </div>
                {categories.map((item, index) => (
                  <label key={index} className="checkbox-inline me-4">
                    <input
                      type="checkbox"
                      value={item.id}
                      onClick={handleChangeCategoryId}
                    />{" "}
                    {item.name}
                  </label>
                ))}
              </div> */}

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

export default EditProduct;
