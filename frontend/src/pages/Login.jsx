import React, { useState } from "react";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username: formData.username,
        password: formData.password
      });


      console.log("STEP 1 - FULL RESPONSE:", res);
      console.log("STEP 2 - RESPONSE DATA:", res.data);
      console.log("STEP 3 - FULLNAME FIELD:", res.data.fullname);
      console.log("STEP 4 - fullName FIELD:", res.data.fullName);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.fullname);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") {
        window.location.href = "/admin-dashboard";
      } else {
        window.location.href = "/student-dashboard";
      }

    } catch (err) {
      console.error(err);
      alert("Invalid Credentials");
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            <FaSignInAlt /> Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;