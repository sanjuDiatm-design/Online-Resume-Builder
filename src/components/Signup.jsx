import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, API_BASE_URL } from '../context/AuthContext';
import '../StyleSheets/Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          login(data.token, data.user);
          setMessage("Account created successfully!");
          setTimeout(() => navigate('/dashboard'), 600);
        } else {
          setMessage("Signup successful! Please log in.");
          setTimeout(() => navigate('/login'), 1000);
        }
      } else {
        setMessage(data.error || "Signup failed.");
      }
    } catch (error) {
      setMessage("Could not connect to backend server. Make sure MongoDB and backend are running.");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="signup-subtitle">Start building professional resumes in seconds</p>

        {message && (
          <div className={`message-banner ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="username">Full Name</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Jane Doe"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="jane@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="At least 6 characters"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="signup-btn" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Get Started Free'}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
