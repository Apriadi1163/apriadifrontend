import React, { useState, useContext } from "react";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../navbar/navbar";

function AddCategory() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  function navigationSave() {
    navigate("/category");
  }
  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/register");
  };
  const [category, setCategory] = useState();

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Convert form data to string here ...
      const body = JSON.stringify({ name: category });
      const response = await API.post("/category", body, config);
      navigate("/category");
      //console.log(response.data.data.token);
      //console.log(response);
      //Checking process
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="bg-black" style={{ height: "100vh" }}>
        <NavbarAdmin />
        <div style={{ width: "3em", backgroundColor: "white" }}>
          <h4 className="edit-category-label" style={{ width: "10em" }}>
            Add Category
          </h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-5 form">
            <div d-grid gap-2 mt-5>
              <input
                name="category"
                placeholder="category"
                value={category}
                onChange={handleChange}
                className="edit-place"
              />
            </div>

            <div className="d-grid gap-2 mt-5">
              <button className="edit-button-save" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
