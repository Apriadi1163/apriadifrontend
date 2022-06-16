import React, { useState, useEffect, useContext } from "react";
import { Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import Navbara from "../navbar/navbar";
import { UserContext } from "../context/userContext";

function User() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/register");
  };
  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      const response = await API.get("/users");
      // Store product data to useState variabel
      setUser(response.data.data.users);
      console.log(response.data.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
          <h3 className="list-category">List User</h3>
        </div>
      </div>
      <container>
        <Row className="table-category">
          {user?.length != 0 ? (
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
                  <th>Email</th>
                  <th style={{ textAlign: "center" }}>name</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {user.map((item, index) => (
                  <tr>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">{item.name}</td>
                    <td className="align-middle">{item.email}</td>
                    <td className="align-middle">{item.status}</td>
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
    </div>
  );
}

export default User;
