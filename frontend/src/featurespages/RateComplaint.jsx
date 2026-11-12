import React, { useState } from "react";
import "../css/RateComplaint.css";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const RateComplaint = () => {

  const [complaintId, setComplaintId] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!complaintId || rating === 0) {
      setMessage("⚠️ Please enter complaint ID and select rating");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/student/complaints/rate/${complaintId}?rating=${rating}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("✅ Rating submitted successfully!");
      setComplaintId("");
      setRating(0);

    } catch (error) {
      setMessage("❌ Failed to submit rating");
      console.error(error);
    }
  };

  return (
    <div className="rate-container">

      <div className="rate-card">
        <h2>Rate Complaint ⭐</h2>

        {message && <p className="message">{message}</p>}

        {/* Complaint ID */}
        <input
          type="text"
          placeholder="Enter Complaint ID (e.g. CMP-123ABC)"
          value={complaintId}
          onChange={(e) => setComplaintId(e.target.value)}
        />

        {/* ⭐ Stars */}
        <div className="star-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={30}
              className="star"
              color={star <= (hover || rating) ? "#f59e0b" : "#ccc"}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
            />
          ))}
        </div>

        {/* Submit */}
        <button onClick={handleSubmit}>
          Submit Rating
        </button>

      </div>

    </div>
  );
};

export default RateComplaint;