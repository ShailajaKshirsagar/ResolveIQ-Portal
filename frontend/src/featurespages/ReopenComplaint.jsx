import React, { useState } from "react";
import "../css/ReopenComplaint.css";
import axios from "axios";
import { FaRedo } from "react-icons/fa";

const ReopenComplaint = () => {

  const [complaintId, setComplaintId] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleReopen = async () => {
    if (!complaintId) {
      setMessage("⚠️ Please enter complaint ID");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/student/complaints/reopen/${complaintId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("✅ Complaint reopened successfully!");
      setComplaintId("");

    } catch (error) {
      setMessage("❌ Only resolved complaints can be reopened");
      console.error(error);
    }
  };

  return (
    <div className="reopen-container">

      <div className="reopen-card">
        <h2><FaRedo /> Reopen Complaint</h2>

        {message && <p className="message">{message}</p>}

        <input
          type="text"
          placeholder="Enter Complaint ID (e.g. CMP-123ABC)"
          value={complaintId}
          onChange={(e) => setComplaintId(e.target.value)}
        />

        <button onClick={handleReopen}>
          Reopen Complaint
        </button>

      </div>

    </div>
  );
};

export default ReopenComplaint;