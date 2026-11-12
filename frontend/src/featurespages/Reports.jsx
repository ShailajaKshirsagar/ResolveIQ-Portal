import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Reports.css";
import { FaDownload, FaFileExcel } from "react-icons/fa";

const Reports = () => {

    const [date, setDate] = useState("");
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:8080/reports/get-all-complaint-reports",
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // 🔥 FIX
                    },
                }
            );

            setReports(res.data);

        } catch (err) {
            console.log("Fetch Reports Error:", err);
        }
    };

    const downloadReport = async () => {
        if (!date) {
            alert("Please select date");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:8080/reports/download-complaint-report?date=${date}`,
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");

            link.href = url;
            link.setAttribute(
                "download",
                `Complaint_Report_${date}.xlsx`
            );

            document.body.appendChild(link);
            link.click();

        } catch (err) {
            console.log(err);
            alert("Report not found for selected date");
        }
    };

    const downloadExisting = async (fileName) => {
        try {
            const token = localStorage.getItem("token");

            const date = fileName
                .replace("Complaint_Report_", "")
                .replace(".xlsx", "");

            const response = await axios.get(
                `http://localhost:8080/reports/download-complaint-report?date=${date}`,
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");

            link.href = url;
            link.setAttribute("download", fileName);

            document.body.appendChild(link);
            link.click();

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="reports-container">

            <h1>📊 Complaint Reports</h1>

            <div className="download-box">

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <button onClick={downloadReport}>
                    <FaDownload /> Download
                </button>

            </div>

            <div className="reports-list">

                <h2>📂 Available Reports</h2>
                {reports.length > 0 ? (
                    reports.map((file, index) => (
                        <div
                            key={index}
                            className="report-card"
                            onClick={() => downloadExisting(file)}
                        >
                            <FaFileExcel className="excel-icon" />
                            <span>{file}</span>
                        </div>
                    ))
                ) : (
                    <p>No reports available</p>
                )}

            </div>

        </div>
    );
};

export default Reports;