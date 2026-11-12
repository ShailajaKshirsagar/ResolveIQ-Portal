import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/StudentDashboard.css";
import {
  FaPlusCircle,
  FaList,
  FaSearch,
  FaStar,
  FaRedo
} from "react-icons/fa";

const StudentDashboard = () => {
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const features = [
    {
      title: "Submit Complaint",
      desc: "Raise a new complaint easily ",
      icon: <FaPlusCircle />,
      path: "/submit"
    },
    {
      title: "View Complaints",
      desc: "See all your submitted complaints Here",
      icon: <FaList />,
      path: "/view"
    },
    {
      title: "Track Status",
      desc: "Check Your complaint Progress ",
      icon: <FaSearch />,
      path: "/track"
    },
    {
      title: "Rate Complaint",
      desc: "Give feedback on resolved issues",
      icon: <FaStar />,
      path: "/rate"
    },
    {
      title: "Reopen Complaint",
      desc: "Reopen unresolved complaints",
      icon: <FaRedo />,
      path: "/view"
    }
  ];

  return (
    <div className="dashboard-container">
      
      <div className="welcome-section">
        <h1>Welcome, {name} 🎉</h1>
        <p>Manage your complaints easily and efficiently</p>
      </div>

      <div className="card-container">
        {features.map((feature, index) => (
          <div key={index} className="card">
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>

            <button onClick={() => navigate(feature.path)}>
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;