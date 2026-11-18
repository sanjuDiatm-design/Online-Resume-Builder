import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, API_BASE_URL } from '../context/AuthContext';
import '../StyleSheets/Dashboard.css';

function Dashboard() {
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
      return;
    }

    if (token) {
      fetchResumes();
    }
  }, [token, isAuthenticated, authLoading]);

  const fetchResumes = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/resumes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setResumes(data.resumes || []);
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to load your resumes.');
      }
    } catch (err) {
      setError('Could not connect to server. Please verify backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title || 'this resume'}"?`)) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/resumes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setResumes((prev) => prev.filter((r) => r._id !== id));
      } else {
        alert('Failed to delete resume.');
      }
    } catch (err) {
      alert('Network error while deleting.');
      console.error(err);
    }
  };

  if (authLoading) {
    return <div className="dashboard-loading">Loading account...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome back, {user?.name || 'Friend'}!</h1>
          <p className="dashboard-subtitle">Manage, edit, and export your professional resumes.</p>
        </div>
        <Link to="/template" className="dashboard-btn-create">
          + Create New Resume
        </Link>
      </div>

      {error && <div className="dashboard-error">{error}</div>}

      {loading ? (
        <div className="dashboard-loading">Fetching your resumes...</div>
      ) : resumes.length === 0 ? (
        <div className="dashboard-empty">
          <div className="empty-icon">📄</div>
          <h3>No resumes yet</h3>
          <p>You haven't saved any resumes yet. Pick a template and start building your career story!</p>
          <Link to="/template" className="dashboard-btn-create">
            Browse Templates & Start
          </Link>
        </div>
      ) : (
        <div className="resumes-grid">
          {resumes.map((resume) => (
            <div key={resume._id} className="resume-card">
              <div className="resume-card-header">
                <span className={`resume-badge resume-badge--${resume.templateId}`}>
                  {resume.templateId?.replace('-', ' ')}
                </span>
                <span className="resume-date">
                  {new Date(resume.updatedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <h3 className="resume-card-title">{resume.title || 'Untitled Resume'}</h3>
              <p className="resume-card-role">
                {resume.personalInfo?.jobTitle || 'No target role specified'}
              </p>

              <div className="resume-card-footer">
                <button
                  className="resume-action-btn resume-action-btn--edit"
                  onClick={() => navigate(`/build/${resume.templateId || 'template-one'}?id=${resume._id}`)}
                >
                  Edit Resume
                </button>
                <button
                  className="resume-action-btn resume-action-btn--delete"
                  onClick={() => handleDelete(resume._id, resume.title)}
                  title="Delete Resume"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

