import React, { useState } from "react";
import "../css/SubmitComplaint.css";
import axios from "axios";
import { FaHeading, FaAlignLeft, FaTags } from "react-icons/fa";

const SubmitComplaint = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: ""
  });

  const [message, setMessage] = useState("");

  const categories = [
    "ACADEMIC",
    "HOSTEL",
    "LIBRARY",
    "INFRASTRUCTURE",
    "EXAM",
    "CANTEEN",
    "TRANSPORT",
    "TECHNICAL",
    "OTHER"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/student/complaints/submit-complaint",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(response.data);

      setFormData({
        title: "",
        description: "",
        category: ""
      });

    } catch (error) {
      setMessage("❌ Error submitting complaint!");
      console.error(error);
    }
  };

  return (
    <div className="submit-container">
      <div className="form-card">
        <h2>Submit Complaint 📝</h2>

        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <FaHeading className="icon" />
            <input
              type="text"
              name="title"
              placeholder="Enter Complaint Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaAlignLeft className="icon" />
            <textarea
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaTags className="icon" />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Submit Complaint</button>
        </form>
      </div>
    </div>
  );
};

export default SubmitComplaint;