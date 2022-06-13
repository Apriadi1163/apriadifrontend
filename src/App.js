import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Complain from "./components/Complain";
import ComplainAdmin from "./components/ComplainAdmin";
import Category from "./components/Category";
import Countdown from "./components/Countdown";
import Detailproduct from "./components/Detailproduct";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
// import Product from "./components/Product";
import Product from "./components/Product";
import Profil from "./components/Profil";
import Register from "./components/Register";
import Edit from "./components/Edit";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";
import AddCategory from "./components/AddCategory";
import { API, setAuthToken } from "./config/api";
import EditPicture from "./components/EditPicture";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  // console.clear();
  console.log(state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin == false) {
      navigate("/register");
    } else {
      if (state.user.status === "admin") {
        navigate("/product");
      } else if (state.user.status === "customer") {
        navigate("/homepage");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/checkauth");

      if (response.status === 404) {
        console.log(response.data);

        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      console.log(payload);
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/profile" element={<Profil />} />
      <Route path="/category" element={<Category />} />
      <Route path="/register" element={<Register />} />
      <Route path="/detailproduct/:id" element={<Detailproduct />} />
      <Route path="/product" element={<Product />} />
      <Route path="/countdown" element={<Countdown />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/editproduct/:id" element={<EditProduct />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/addcategory" element={<AddCategory />} />
      <Route path="/editpicture" element={<EditPicture />} />
      <Route path="/complain" element={<Complain />} />
      <Route path="/complainadmin" element={<ComplainAdmin />} />
    </Routes>
  );
}

export default App;
