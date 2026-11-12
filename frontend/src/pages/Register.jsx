import React, { useState } from "react";
import "../css/Register.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaIdCard,
  FaBook,
  FaLayerGroup,
  FaBirthdayCake
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    rollno: "",
    className: "",
    email: "",
    password: "",
    course: "",
    age: ""
  });

  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const COLLEGE_DOMAIN = "@gmail.com";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    if (name === "email") {
      if (!value.endsWith(COLLEGE_DOMAIN)) {
        setEmailError(`Please enter your college email ID (${COLLEGE_DOMAIN})`);
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.endsWith(COLLEGE_DOMAIN)) {
      setEmailError(`Please enter your college email ID (${COLLEGE_DOMAIN})`);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password
      };

      await axios.post("http://localhost:8080/api/auth/register", payload);

      toast.success(
        "🎉 Successfully registered! Check your email for login credentials.",
        {
          position: "top-center",
          autoClose: 15000,
        }
      );

      setTimeout(() => {
        navigate("/login");
      }, 4000);

    } catch (err) {
      toast.error("❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2 className="register-title">Create Account</h2>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="fullname" 
              placeholder="Full name"
              pattern="[A-Za-z ]+"
              title="Only letters allowed"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaIdCard className="icon" />
            <input type="text" name="rollno" placeholder="Roll No"
              value={formData.rollno} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <FaLayerGroup className="icon" />
            <input type="text" name="className" placeholder="Class"
              value={formData.className} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <FaBook className="icon" />
            <input type="text" name="course" placeholder="Course"
              value={formData.course} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input type="email" name="email" placeholder="College Email"
              value={formData.email} onChange={handleChange} required />
          </div>

          {emailError && (
            <p className="error-text">{emailError}</p>
          )}

          <div className="input-group">
            <FaLock className="icon" />
            <input type="password" name="password" placeholder="Password"
              value={formData.password} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <FaBirthdayCake className="icon" />
            <input type="number" name="age" placeholder="Age"
              value={formData.age} onChange={handleChange} required />
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span> Registering...
              </>
            ) : (
              "Register"
            )}
          </button>

        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;