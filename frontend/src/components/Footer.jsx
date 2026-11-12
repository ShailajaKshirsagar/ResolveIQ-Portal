import React from "react";
import "../css/Footer.css";
import { FaHome, FaList, FaUserPlus, FaSignInAlt, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-section" id="about">

      <div className="container">
        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">ResolveIQ</h5>

            <ul className="footer-points">
              <li>🎯 A centralized complaint management system for students</li>
              <li>⚡ Bridges the gap between students and college authorities</li>
              <li>📊 Provides transparent and trackable complaint resolution</li>
              <li>🤖 Integrates AI for smart assistance and faster responses</li>
              <li>🔐 Ensures secure access with role-based authentication</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-5 footer-center">
            <h5 className="footer-title">Quick Links</h5>

            <ul className="footer-links">
              <li>
                <a href="/"><FaHome className="footer-icon" /> Home</a>
              </li>

              <li>
                <a href="#features"><FaList className="footer-icon" /> Features</a>
              </li>

              <li>
                <a href="/register"><FaUserPlus className="footer-icon" /> Register</a>
              </li>

              <li>
                <a href="/login"><FaSignInAlt className="footer-icon" /> Login</a>
              </li>
            </ul>
          </div>

          {/* Contact + College */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Contact</h5>

            <p className="footer-text">Email: support@resolveiq.com</p>
            <p className="footer-text">Phone: +91 9876543210</p>

            <h6 className="footer-subtitle">College Website</h6>
            <a
              href="https://maharshikarvebcapune.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="college-link"
            >
              <FaGlobe className="footer-icon" /> Visit Official Website
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer-bottom text-center">
          <p>© 2026 ResolveIQ. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;