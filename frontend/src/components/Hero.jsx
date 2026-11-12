import React, { useState } from "react";
import "../css/Hero.css";
import { FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Hero = () => {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!question.trim() || loading) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await axios.post(
        "http://localhost:8080/ai/ask",
        { question: question },
        { headers: { "Content-Type": "application/json" } }
      );
      setAnswer(res.data);
    } catch (error) {
      console.error(error);
      setAnswer("Could not reach the server. Make sure the backend is running on port 8080.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero-section">
      <div className="container text-center">

        <h1 className="hero-title fade-in">
          Smart Complaint Management Made Easy
        </h1>

        <p className="hero-subtitle fade-in delay-1">
          ResolveIQ helps students raise, track, and manage complaints efficiently
          with real-time updates and AI-powered assistance.
        </p>

        <div className="ai-box fade-in delay-2">
          <div className="ai-input-container">

            <FaRobot className="ai-icon" />

            <input
              type="text"
              className="ai-input"
              placeholder="Ask your question to AI..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
            />

            <button className="ai-btn" onClick={handleAskAI} disabled={loading}>
              {loading ? "Thinking..." : "Ask AI"}
            </button>

          </div>
        </div>

        {answer && (
          <div className="ai-response fade-in">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        )}

        <div className="hero-buttons fade-in delay-3">

          <Link to="/register">
            <button className="hero-primary-btn">
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button className="hero-secondary-btn">
              Login
            </button>
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Hero;