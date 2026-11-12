import React from "react";
import "../css/Navbar.css";
import {
  FaHome,
  FaInfoCircle,
  FaList,
  FaUserPlus,
  FaSignInAlt,
  FaUserCircle
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.jpg";

const Navbar = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  const scrollToAbout = () => {
    const section = document.getElementById("about");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAboutClick = () => {
    navigate("/");

    setTimeout(() => {
      const section = document.getElementById("about");
      section?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  const handleFeaturesClick = () => {
    navigate("/");

    setTimeout(() => {
      const section = document.getElementById("features");
      section?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  const handleHomeClick = () => {
    navigate("/");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
      <div className="container-fluid px-3">
        <div className="brand-container">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="navbar-brand logo-text">
            ResolveIQ - KBJIIT Complaint Management System
          </span>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          <div className="ms-auto">
            <ul className="navbar-nav align-items-lg-center gap-2">

              <li className="nav-item">
                <Link to="/" className="nav-btn" onClick={handleHomeClick}>
                  <FaHome className="icon" /> Home
                </Link>
              </li>

              <li className="nav-item">
                <button className="nav-btn" onClick={handleAboutClick}>
                  <FaInfoCircle className="icon" /> About US
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-btn" onClick={handleFeaturesClick}>
                  <FaList className="icon" /> Features
                </button>
              </li>

              {!token ? (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-btn">
                      <FaUserPlus className="icon" /> Register
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/login" className="nav-btn login-special">
                      <FaSignInAlt className="icon" /> Login
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item profile-menu">
                  <span className="nav-btn">
                    <FaUserCircle /> {name}
                  </span>

                  <div className="dropdown-menu-custom">

                    {role === "ADMIN" ? (
                      <button
                        onClick={() => navigate("/admin-dashboard")}
                        className="dropdown-item-custom"
                      >
                        <FaTachometerAlt className="me-2" /> Dashboard
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/student-dashboard")}
                        className="dropdown-item-custom"
                      >
                        <FaTachometerAlt className="me-2" /> Dashboard
                      </button>
                    )}

                    <button
                      onClick={handleLogout}
                      className="dropdown-item-custom"
                    >
                      <FaSignOutAlt className="me-2" /> Logout
                    </button>

                  </div>
                </li>
              )}

            </ul>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;