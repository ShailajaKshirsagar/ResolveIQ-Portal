import React, { useEffect } from "react";
import "../css/Features.css";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaClipboardList,
  FaChartLine,
  FaUserShield,
  FaLayerGroup,
  FaEnvelope,
  FaRobot,
} from "react-icons/fa";

const features = [
  {
    icon: <FaClipboardList />,
    title: "Easy Complaint Submission",
    desc: "Submit complaints quickly with simple and user-friendly interface.",
  },
  {
    icon: <FaChartLine />,
    title: "Real-Time Status Tracking",
    desc: "Track your complaint status instantly with live updates.",
  },
  {
    icon: <FaUserShield />,
    title: "Admin Dashboard",
    desc: "Admins can manage and resolve complaints efficiently.",
  },
  {
    icon: <FaLayerGroup />,
    title: "Category-Based System",
    desc: "Organize complaints based on categories for better management.",
  },
  {
    icon: <FaEnvelope />,
    title: "Email Notifications",
    desc: "Get notified when your complaint status is updated.",
  },
  {
    icon: <FaRobot />,
    title: "AI Assistant Support",
    desc: "Ask queries and get instant help using AI assistant.",
  },
];

const Features = () => {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="features-section" id="features">
      <div className="container text-center">

        {/* Heading */}
        <h2 className="features-title">Key Features of ResolveIQ</h2>
        <p className="features-subtitle">
          Powerful tools to simplify complaint management for students and admins.
        </p>

        {/* Cards */}
        <div className="row mt-5">
          {features.map((feature, index) => (
            <div className="col-md-4 mb-4" key={index}>
              
              <div
                className="feature-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                
                <div className="feature-icon">
                  {feature.icon}
                </div>

                <h5 className="feature-title">{feature.title}</h5>

                <p className="feature-desc">{feature.desc}</p>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;