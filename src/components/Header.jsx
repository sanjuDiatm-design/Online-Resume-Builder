import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../StyleSheets/Header.css';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          <div className="navbar__logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <span className="navbar__logo-text">Resume<span className="text-highlight">Hub</span></span>
        </Link>

        {/* Hamburger / Close Icon */}
        <button
          className={`menu-toggle ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          type="button"
        >
          <span className="bar bar1"></span>
          <span className="bar bar2"></span>
          <span className="bar bar3"></span>
        </button>

        {/* Drawer containing navigation links AND action buttons */}
        <div className={`navbar__drawer ${isMobileMenuOpen ? "open" : ""}`}>
          <nav className="navbar__nav">
            <Link to="/" className={`navbar__link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>
              HOME
            </Link>
            <Link to="/template" className={`navbar__link ${isActive('/template') ? 'active' : ''}`} onClick={closeMenu}>
              TEMPLATES
            </Link>
            <Link to="/build/template-one" className={`navbar__link ${location.pathname.startsWith('/build') ? 'active' : ''}`} onClick={closeMenu}>
              BUILDER
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className={`navbar__link ${isActive('/dashboard') ? 'active' : ''}`} onClick={closeMenu}>
                MY RESUMES
              </Link>
            )}
            <Link to="/about" className={`navbar__link ${isActive('/about') ? 'active' : ''}`} onClick={closeMenu}>
              ABOUT US
            </Link>
            <Link to="/contact" className={`navbar__link ${isActive('/contact') ? 'active' : ''}`} onClick={closeMenu}>
              CONTACT
            </Link>
          </nav>

          <div className="navbar__actions">
            {isAuthenticated ? (
              <div className="navbar__user-profile">
                <Link to="/dashboard" className="user-badge" onClick={closeMenu} title="Go to Dashboard">
                  <span className="user-avatar">{user?.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                  <span className="user-name">{user?.name?.split(' ')[0] || 'User'}</span>
                </Link>
                <button className="navbar__btn navbar__btn--logout" onClick={handleLogout} type="button">
                  LOG OUT
                </button>
              </div>
            ) : (
              <div className="navbar__auth-group">
                <Link to="/login" className="navbar__btn navbar__btn--login" onClick={closeMenu}>
                  LOG IN
                </Link>
                <Link to="/signup" className="navbar__btn navbar__btn--signup" onClick={closeMenu}>
                  SIGN UP
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
