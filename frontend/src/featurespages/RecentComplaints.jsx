import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/RecentComplaints.css";
import { useNavigate } from "react-router-dom";

const RecentComplaints = () => {

  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchRecentComplaints();
  }, []);

  const fetchRecentComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8080/api/admin/complaints/recent-complaints",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComplaints(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleCardClick = () => {
    navigate("/admin/view");
  };

  return (
    <div className="recent-container">

      <h2 className="recent-title">🆕 Recent Complaints</h2>

      <div className="recent-grid">

        {complaints.length > 0 ? (
          complaints.map((c, index) => (
            
            <div 
              className="recent-card" 
              key={index}
              onClick={handleCardClick}  
              style={{ cursor: "pointer" }} 
            >

              <h3 className="card-title">{c.title}</h3>

              <p className="card-desc">
                {c.description.length > 80
                  ? c.description.substring(0, 80) + "..."
                  : c.description}
              </p>

              <div className="card-info">
                <span className="category">{c.category}</span>

                <span className={`status ${c.status.toLowerCase()}`}>
                  {c.status}
                </span>
              </div>

              <div className="priority-box">
                Priority:
                <span className={`priority ${c.priority.toLowerCase()}`}>
                  {c.priority}
                </span>
              </div>

            </div>
          ))
        ) : (
          <p className="no-data">No recent complaints</p>
        )}

      </div>

    </div>
  );
};

export default RecentComplaints;