import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/AdminViewComplaints.css";
import { FaFilter, FaSyncAlt } from "react-icons/fa";

const FilterComplaints = () => {

  const [status, setStatus] = useState("");
  const [complaints, setComplaints] = useState([]);

  // ✅ Load all on page load
  useEffect(() => {
    fetchAllComplaints();
  }, []);

  const fetchAllComplaints = async () => {
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

  // ✅ Filter logic with ALL support
  const handleFilter = async () => {

    if (!status) {
      alert("Please select status");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // 🔥 If ALL selected → fetch all complaints
      if (status === "ALL") {
        fetchAllComplaints();
        return;
      }

      // 🔥 Else call filter API
      const res = await axios.get(
        `http://localhost:8080/api/admin/complaints/filter-by-status/${status}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComplaints(res.data);

    } catch (err) {
      console.log(err);
      setComplaints([]);
    }
  };

  // ✅ Reset
  const resetTable = () => {
    setStatus("");
    fetchAllComplaints();
  };

  return (
    <div className="admin-view-container">

      <div className="top-bar">
        <h2> 📋 Complaints </h2>
      </div>

      <div className="center-search">
        <div className="search-group">

          {/* CENTER DROPDOWN */}
          <select
            className="status-dropdown centered-dropdown"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {/* BUTTONS */}
          <div className="btn-group">
            <button className="search-btn" onClick={handleFilter}>
              <FaFilter /> Filter
            </button>

            <button className="refresh-btn" onClick={resetTable}>
              <FaSyncAlt /> Reset
            </button>
          </div>

        </div>
      </div>

      {/* TABLE */}
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
            {complaints.length > 0 ? (
              complaints.map((c, index) => (
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
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default FilterComplaints;