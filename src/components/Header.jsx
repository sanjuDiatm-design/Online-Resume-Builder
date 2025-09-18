import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../StyleSheets/Header.css';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar__logo">
    
        <span className="navbar__logo-text">ResumeHub</span>
      </div>
      <div className="menu-icon" onClick={toggleMobileMenu}>
        <div className={isMobileMenuOpen ? "bar bar1 open" : "bar bar1"}></div>
        <div className={isMobileMenuOpen ? "bar bar2 open" : "bar bar2"}></div>
        <div className={isMobileMenuOpen ? "bar bar3 open" : "bar bar3"}></div>
      </div>
      <nav className={`navbar__nav ${isMobileMenuOpen ? "open" : ""}`}>
        <Link to="/" className="navbar__link" onClick={toggleMobileMenu}>HOME</Link>
        <Link to="/about" className="navbar__link" onClick={toggleMobileMenu}>ABOUT US</Link>
        <Link to="/template" className="navbar__link" onClick={toggleMobileMenu}>TEMPLATE</Link>
        <Link to="/contact" className="navbar__link" onClick={toggleMobileMenu}>CONTACT</Link>
      </nav>
      <div className={`navbar__actions ${isMobileMenuOpen ? "open" : ""}`}>
        <Link to="/login" className="navbar__btn navbar__btn--login" onClick={toggleMobileMenu}>LOG IN</Link>
        <Link to="/signup" className="navbar__btn navbar__btn--signup" onClick={toggleMobileMenu}>SIGN UP</Link>
      </div>
    </header>
    
  );
}

export default Header;
