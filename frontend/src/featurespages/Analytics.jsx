import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Analytics.css";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

const Analytics = () => {

    const [stats, setStats] = useState(null);
    const [trendData, setTrendData] = useState([]);

    useEffect(() => {
        fetchStats();
        fetchTrend();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:8080/api/admin/complaints/analytics",
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            console.log("STATS:", res.data);

            setStats(res.data);

        } catch (err) {
            console.log("Stats error:", err);
        }
    };

    const fetchTrend = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:8080/api/admin/complaints/monthly-trend",
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const formatted = Object.keys(res.data).map(key => ({
                month: key,
                complaints: res.data[key]
            }));

            setTrendData(formatted);

        } catch (err) {
            console.log(err);
        }
    };

    if (!stats) {
        return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
    }

    return (
        <div className="analytics-container">

            <h2 className="analytics-title">📊 Analytics Dashboard</h2>

            {/* Cards */}
            <div className="analytics-cards">
                <div className="card total">
                    <h3>Total</h3>
                    <p>{stats.totalComplaints}</p>
                </div>

                <div className="card pending">
                    <h3>Pending</h3>
                    <p>{stats.pendingComplaints}</p>
                </div>

                <div className="card resolved">
                    <h3>Resolved</h3>
                    <p>{stats.resolvedComplaints}</p>
                </div>

                <div className="card rejected">
                    <h3>Rejected</h3>
                    <p>{stats.rejectedComplaints}</p>
                </div>

            </div>

            <div className="chart-box">
                <h3>📈 Monthly Complaint Trend</h3>

                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="complaints"
                            stroke="#6366f1"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default Analytics;