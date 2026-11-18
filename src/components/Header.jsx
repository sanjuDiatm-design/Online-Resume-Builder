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
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
      <Link to="/" className="navbar__brand" onClick={closeMenu}>
        <div className="navbar__logo-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <span className="navbar__logo-text">Resume<span className="text-highlight">Hub</span></span>
      </Link>

      <div className="menu-icon" onClick={toggleMobileMenu}>
        <div className={isMobileMenuOpen ? "bar bar1 open" : "bar bar1"}></div>
        <div className={isMobileMenuOpen ? "bar bar2 open" : "bar bar2"}></div>
        <div className={isMobileMenuOpen ? "bar bar3 open" : "bar bar3"}></div>
      </div>

      <nav className={`navbar__nav ${isMobileMenuOpen ? "open" : ""}`}>
        <Link to="/" className={`navbar__link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>HOME</Link>
        <Link to="/template" className={`navbar__link ${isActive('/template') ? 'active' : ''}`} onClick={closeMenu}>TEMPLATES</Link>
        <Link to="/build/template-one" className={`navbar__link ${location.pathname.startsWith('/build') ? 'active' : ''}`} onClick={closeMenu}>BUILDER</Link>
        {isAuthenticated && (
          <Link to="/dashboard" className={`navbar__link ${isActive('/dashboard') ? 'active' : ''}`} onClick={closeMenu}>MY RESUMES</Link>
        )}
        <Link to="/about" className={`navbar__link ${isActive('/about') ? 'active' : ''}`} onClick={closeMenu}>ABOUT US</Link>
        <Link to="/contact" className={`navbar__link ${isActive('/contact') ? 'active' : ''}`} onClick={closeMenu}>CONTACT</Link>
      </nav>

      <div className={`navbar__actions ${isMobileMenuOpen ? "open" : ""}`}>
        {isAuthenticated ? (
          <div className="navbar__user-profile">
            <Link to="/dashboard" className="user-badge" onClick={closeMenu} title="Go to Dashboard">
              <span className="user-avatar">{user?.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
              <span className="user-name">{user?.name?.split(' ')[0] || 'User'}</span>
            </Link>
            <button className="navbar__btn navbar__btn--logout" onClick={handleLogout}>LOG OUT</button>
          </div>
        ) : (
          <>
            <Link to="/login" className="navbar__btn navbar__btn--login" onClick={closeMenu}>LOG IN</Link>
            <Link to="/signup" className="navbar__btn navbar__btn--signup" onClick={closeMenu}>SIGN UP</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
