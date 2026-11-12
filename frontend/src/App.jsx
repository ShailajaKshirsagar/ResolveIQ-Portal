import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ViewComplaints from "./featurespages/ViewComplaint";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import SubmitComplaint from "./featurespages/SubmitComplaint";
import RateComplaint from "./featurespages/RateComplaint";
import ReopenComplaint from "./featurespages/ReopenComplaint";
import AdminViewComplaints from "./featurespages/AdminViewComplaints";
import FilterComplaints from "./featurespages/FilterComplaints";
import PendingComplaints from "./featurespages/PendingComplaints";
import RecentComplaints from "./featurespages/RecentComplaints";
import Reports from "./featurespages/Reports";
import Analytics from "./featurespages/Analytics";


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/student-dashboard"
          element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/submit"
          element={
            <PrivateRoute>
              <SubmitComplaint />
            </PrivateRoute>
          }
        />
        <Route
          path="/view"
          element={
            <PrivateRoute>
              <ViewComplaints />
            </PrivateRoute>
          }
        />
        <Route
          path="/track"
          element={
            <PrivateRoute>
              <ViewComplaints />
            </PrivateRoute>
          }
        />
        <Route
          path="/rate"
          element={
            <PrivateRoute>
              <RateComplaint />
            </PrivateRoute>
          }
        />
        <Route
          path="/reopen"
          element={
            <PrivateRoute>
              <ReopenComplaint />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/admin/view"
          element={
            <PrivateRoute>
              <AdminViewComplaints />
            </PrivateRoute>
          } />
        <Route path="/admin/get"
          element={
            <PrivateRoute>
              <AdminViewComplaints />
            </PrivateRoute>
          } />
        <Route path="/admin/filter"
          element={
            <PrivateRoute>
              <FilterComplaints />
            </PrivateRoute>
          }
        />
        <Route path="/admin/pending"
          element={
            <PrivateRoute>
              <PendingComplaints />
            </PrivateRoute>
          }
        />
        <Route path="/admin/update"
          element={
            <PrivateRoute>
              <PendingComplaints />
            </PrivateRoute>
          }
        />
        <Route path="/admin/resolve"
          element={
            <PrivateRoute>
              <PendingComplaints />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/recent"
          element={
            <PrivateRoute>
              <RecentComplaints />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />
        <Route path="/admin/analytics"
          element={
            <PrivateRoute>
              <Analytics />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;