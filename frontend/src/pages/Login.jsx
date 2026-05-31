import React, { useState } from "react";
import { X, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import "../styles/Login.css";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (onLoginSuccess) onLoginSuccess(data.user);
      else window.location.href = "/admin";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Background video */}
      <video autoPlay muted loop playsInline className="login-bg-video">
        <source
          src="https://videos.pexels.com/video-files/1448735/1448735-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="login-card">
        <button
          className="login-close"
          onClick={() => (window.location.href = "/")}
        >
          <X />
        </button>

        <h2 className="login-title">Admin Login</h2>
        <p className="login-subtitle">Welcome!</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Mail className="input-icon" />
            <input
              type="email"
              value={email}
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="input-group password-group">
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="toggle-icon" />
              ) : (
                <Eye className="toggle-icon" />
              )}
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          <button className="login-button" disabled={loading}>
            {loading ? (
              <span className="loader-container">
                <Loader2 className="spinner" />
                Logging in...
              </span>
            ) : (
              "Log in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
