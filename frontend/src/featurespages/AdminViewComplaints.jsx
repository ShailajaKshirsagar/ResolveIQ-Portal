import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AdminViewComplaints.css";
import { FaSearch, FaSyncAlt } from "react-icons/fa";

const AdminViewComplaints = () => {

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8080/api/admin/complaints/view-all-complaints",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchById = async () => {
    if (!search) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:8080/api/admin/complaints/get-complaintById/${search}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComplaints([res.data]); 
    } catch (err) {
      console.log(err);
      setComplaints([]);
    }
  };

  return (
    <div className="admin-view-container">

      <div className="top-bar">
        <h2> 📋 All Complaints</h2>
      </div>

      <div className="center-search">
        <div className="search-group">

          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Enter Complaint ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchById();
              }}
            />
          </div>

          <button className="search-btn" onClick={handleSearchById}>
            Search
          </button>

          <button className="refresh-btn" onClick={fetchComplaints}>
            <FaSyncAlt /> All
          </button>

        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c, index) => (
              <tr key={index}>
                <td>{c.complaintId}</td>
                <td title={c.title}>{c.title}</td>
                <td>{c.category}</td>

                <td>
                  <span className={`status ${c.status.toLowerCase()}`}>
                    {c.status}
                  </span>
                </td>

                <td>
                  <span className={`priority ${c.priority.toLowerCase()}`}>
                    {c.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {complaints.length === 0 && (
          <p className="no-data">No complaints found</p>
        )}
      </div>

    </div>
  );
};

export default AdminViewComplaints;