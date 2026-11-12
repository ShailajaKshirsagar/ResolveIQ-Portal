import React, { useEffect, useState } from "react";
import "../css/ViewComplaint.css";
import axios from "axios";

const ViewComplaints = () => {

    const [complaints, setComplaints] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [trackedData, setTrackedData] = useState(null);

    const [showPopup, setShowPopup] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/student/complaints/view-all-complaints",
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setComplaints(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTrack = async () => {
        if (!searchId) return;

        try {
            const response = await axios.get(
                `http://localhost:8080/api/student/complaints/track-status/${searchId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setTrackedData(response.data);

        } catch (error) {
            alert("Complaint not found ❌");
            setTrackedData(null);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "PENDING":
                return "status pending";
            case "IN_PROGRESS":
                return "status progress";
            case "RESOLVED":
                return "status resolved";
            case "REOPENED":
                return "status reopened";
            default:
                return "status";
        }
    };

    const formatStatus = (status) => {
        return status === "IN_PROGRESS" ? "IN PROGRESS" : status;
    };

    const openPopup = (id) => {
        setSelectedId(id);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedId(null);
    };

    const handleReopen = async () => {
        try {
            await axios.put(
                `http://localhost:8080/api/student/complaints/reopen/${selectedId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // 🔥 Instant UI update
            setComplaints(prev =>
                prev.map(c =>
                    c.complaintId === selectedId
                        ? { ...c, status: "REOPENED" }
                        : c
                )
            );

            setMessage("✅ Complaint reopened successfully!");
            closePopup();

        } catch (error) {
            setMessage("❌ Failed to reopen complaint");
        }
    };

    return (
        <div className="view-container fade-in">

            <h2>My Complaints 📋</h2>

            {message && <p className="success-msg">{message}</p>}

            {/* SEARCH */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter Complaint ID (e.g. CMP-123ABC)"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button onClick={handleTrack}>Track</button>
            </div>

            {/* TRACK RESULT */}
            {trackedData && (
                <div className="track-result">
                    <h3>Complaint Details</h3>
                    <p><b>Title:</b> {trackedData.title}</p>
                    <p><b>Category:</b> {trackedData.category}</p>

                    <p>
                        <b>Status:</b>{" "}
                        <span className={getStatusClass(trackedData.status)}>
                            {formatStatus(trackedData.status)}
                        </span>
                    </p>

                    <p><b>Priority:</b> {trackedData.priority}</p>
                    <p><b>Description:</b> {trackedData.description}</p>

                    {trackedData.status === "RESOLVED" && (
                        <button onClick={() => openPopup(trackedData.complaintId)}>
                            Reopen
                        </button>
                    )}

                    <button
                        className="back-btn"
                        onClick={() => {
                            setTrackedData(null);
                            setSearchId("");
                        }}
                    >
                        ← Back
                    </button>
                </div>
            )}

            {/* TABLE */}
            <table className="complaint-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {complaints.map((c, index) => (
                        <tr key={index}>
                            <td>{c.complaintId}</td>
                            <td>{c.title}</td>
                            <td>{c.category}</td>

                            <td>
                                <span className={getStatusClass(c.status)}>
                                    {formatStatus(c.status)}
                                </span>
                            </td>

                            <td>{c.priority}</td>

                            <td>
                                {c.status === "RESOLVED" ? (
                                    <button
                                        className="reopen-btn"
                                        onClick={() => openPopup(c.complaintId)}
                                    >
                                        Reopen
                                    </button>
                                ) : (
                                    "-"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* POPUP */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h3>Reopen Complaint?</h3>
                        <p>Are you sure you want to reopen this complaint?</p>

                        <div className="popup-buttons">
                            <button onClick={handleReopen}>Yes</button>
                            <button onClick={closePopup} className="cancel">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ViewComplaints;