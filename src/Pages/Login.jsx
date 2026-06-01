import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../api/axios.jsx";
import "./Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check existing login session
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Please enter username");
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter password");
      return;
    }

    try {
      setLoading(true);
      const res = await Api.post("/login", { username, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful! ✅");
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Floating wave decoration */}
      <div className="ocean-waves">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      <div className="login-wrapper">
        <div className="login-card">
          {/* Brand Header */}
          <div className="brand-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="22" fill="url(#oceanGrad)" />
                <path
                  d="M10 28 C14 24, 18 32, 22 28 C26 24, 30 32, 34 28 C36 26, 38 27, 38 28"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M10 33 C14 29, 18 37, 22 33 C26 29, 30 37, 34 33 C36 31, 38 32, 38 33"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <path
                  d="M24 8 L24 20 M20 12 L24 8 L28 12"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="oceanGrad" x1="0" y1="0" x2="48" y2="48">
                    <stop offset="0%" stopColor="#0369a1" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-name">Ocean Overseas</span>
              <span className="brand-tagline">Global Immigration & Visa Services</span>
            </div>
          </div>

          <div className="login-divider"></div>

          <div className="login-header">
            <h2>Admin Portal</h2>
            <p>Enter your credentials to access the admin dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {/* Username Field */}
            <div className="form-group">
              <label>Username</label>
              <div className="input-icon-wrapper">
                <span className="input-icon"></span>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  autoFocus
                />
              </div>
              <small className="input-hint">
                Use your assigned admin username
              </small>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label>Password</label>
              <div className="input-icon-wrapper">
                <span className="input-icon"></span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  tabIndex="-1"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              <small className="input-hint">
                Keep your password secure and confidential
              </small>
            </div>

            {/* Login Button */}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span> Logging in...
                </span>
              ) : (
                "Login  →"
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              🌐 Powered by <strong>Ocean Overseas</strong> &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;