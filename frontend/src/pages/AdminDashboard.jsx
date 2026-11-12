import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";


// Icons
import {
  FaList,
  FaSearch,
  FaFilter,
  FaEdit,
  FaCheckCircle,
  FaClock,
  FaFileDownload,
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const adminName = localStorage.getItem("name") || "Admin";

  const firstName = adminName.split(" ")[0];

  const features = [
    {
      title: "View All Complaints",
      desc: "Access and manage all student complaints",
      icon: <FaList />,
      path: "/admin/view",
    },
    {
      title: "Get Complaint By ID",
      desc: "Search complaint using unique ID",
      icon: <FaSearch />,
      path: "/admin/get",
    },
    {
      title: "Filter Complaints",
      desc: "Filter complaints based on status or type",
      icon: <FaFilter />,
      path: "/admin/filter",
    },
    {
      title: "Update Status",
      desc: "Modify complaint status easily",
      icon: <FaEdit />,
      path: "/admin/update",
    },
    {
      title: "Resolve / Reject",
      desc: "Mark complaints as resolved or rejected",
      icon: <FaCheckCircle />,
      path: "/admin/resolve",
    },
    {
      title: "Pending Complaints",
      desc: "View all pending complaints quickly",
      icon: <FaClock />,
      path: "/admin/pending",
    },
    {
      title: "Reports & Downloads",
      desc: "Download complaint reports",
      icon: <FaFileDownload />,
      path: "/admin/reports",
    },
    {
      title: "Recent Complaints",
      desc: "View latest complaints quickly",
      icon: <FaClock />,
      path: "/admin/recent",
    },
  ];

  return (
    <div className="admin-layout">

      <div className="admin-sidebar">

        <h2 className="admin-logo">Admin Panel</h2>

        <ul className="admin-menu">

          <li onClick={() => navigate("/admin/view")}>
            <FaList /> View Complaints
          </li>

          <li onClick={() => navigate("/admin/pending")}>
            <FaClock /> Pending
          </li>

          <li onClick={() => navigate("/admin/update")}>
            <FaEdit /> Update Status
          </li>

          <li onClick={() => navigate("/admin/reports")}>
            <FaFileDownload /> Reports
          </li>

          <li onClick={() => navigate("/admin/analytics")}>
             📊 Analytics
          </li>

          <li onClick={() => navigate("/admin/settings")}>
            ⚙️ Settings
          </li>
        </ul>

        <div className="admin-sidebar-bottom">

          <div className="admin-greeting">
            <p className="hello-text">Hey 👋</p>
            <h4 className="admin-name">{firstName}</h4>
          </div>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </button>

        </div>

      </div>

      <div className="admin-main">

        <div className="admin-welcome">
          <h1>Welcome {firstName} 👨‍💼</h1>
          <p>Manage and resolve student complaints efficiently</p>
        </div>

        <div className="admin-card-container">
          {features.map((feature, index) => (
            <div className="admin-card" key={index}>
              <div className="admin-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              <button onClick={() => navigate(feature.path)}>
                Open
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;