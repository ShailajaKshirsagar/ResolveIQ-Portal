import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/PendingComplaints.css";
import { FaEdit } from "react-icons/fa";

const PendingComplaints = () => {

  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionType, setActionType] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetchPendingComplaints();
  }, []);

  const fetchPendingComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8080/api/admin/complaints/get-pending-complaints",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedComplaint(null);
  };

  const confirmAction = (type) => {
    setActionType(type);
    setShowConfirm(true);
  };

  const handleFinalAction = async () => {
    try {
      const token = localStorage.getItem("token");

      let url = "";

      if (actionType === "RESOLVED") {
        url = `http://localhost:8080/api/admin/complaints/resolve-complaint/${selectedComplaint.complaintId}`;
      } else {
        url = `http://localhost:8080/api/admin/complaints/reject-complaint/${selectedComplaint.complaintId}`;
      }

      await axios.put(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 🔥 REAL TIME REMOVE
      setComplaints(prev =>
        prev.filter(c => c.complaintId !== selectedComplaint.complaintId)
      );

      setToast(`Complaint ${actionType === "RESOLVED" ? "Resolved" : "Rejected"} Successfully`);

      closeModal();
      setShowConfirm(false);

      setTimeout(() => setToast(""), 3000);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pending-container">

      <h2 className="top-title">⏳ Pending Complaints</h2>

      <div className="table-wrapper">
        <table>
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
            {complaints.length > 0 ? (
              complaints.map((c) => (
                <tr key={c.complaintId}>
                  <td>{c.complaintId}</td>
                  <td title={c.title}>{c.title}</td>
                  <td>{c.category}</td>

                  <td>
                    <span className="status pending">{c.status}</span>
                  </td>

                  <td>
                    <span className={`priority ${c.priority.toLowerCase()}`}>
                      {c.priority}
                    </span>
                  </td>

                  <td>
                    <button
                      className="update-btn"
                      onClick={() => openModal(c)}
                    >
                      <FaEdit /> Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No pending complaints
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Update Status</h3>
            <p>{selectedComplaint?.title}</p>

            <div className="modal-buttons">
              <button onClick={() => confirmAction("RESOLVED")} className="resolve-btn">
                Resolve
              </button>

              <button onClick={() => confirmAction("REJECTED")} className="reject-btn">
                Reject
              </button>
            </div>

            <button onClick={closeModal} className="close-btn">Cancel</button>
          </div>
        </div>
      )}

      {/* Confirm */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="confirm-box">
            <h3>Are you sure?</h3>
            <p>You want to {actionType.toLowerCase()} this complaint?</p>

            <div className="confirm-buttons">
              <button className="yes-btn" onClick={handleFinalAction}>Yes</button>
              <button className="no-btn" onClick={() => setShowConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

    </div>
  );
};

export default PendingComplaints;