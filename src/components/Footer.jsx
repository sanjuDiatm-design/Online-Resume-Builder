import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';
import '../StyleSheets/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h3 className="footer__heading">ResumeHub</h3>
          <p className="footer__text">
            Create professional resumes in minutes with our easy-to-use resume builder.
          </p>
          <div className="footer__social">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <FaLinkedin className="footer__social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <FaTwitter className="footer__social-icon" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <FaGithub className="footer__social-icon" />
            </a>
          </div>
        </div>

        <div className="footer__section">
          <h4 className="footer__subheading">Quick Links</h4>
          <ul className="footer__links">
            <li><Link to="/" className="footer__link">Home</Link></li>
            <li><Link to="/about" className="footer__link">About Us</Link></li>
            <li><Link to="/template" className="footer__link">Templates</Link></li>
            <li><Link to="/build/template-one" className="footer__link">Resume Builder</Link></li>
            <li><Link to="/contact" className="footer__link">Contact</Link></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__subheading">Contact Us</h4>
          <div className="footer__contact">
            <p style={{ color: '#fff', fontWeight: 600, margin: '0 0 6px' }}>Sanju Ghosh</p>
            <a href="mailto:sg6289793@gmail.com" className="footer__contact-link">
              <FaEnvelope className="footer__contact-icon" />
              sg6289793@gmail.com
            </a>
            <p style={{ color: '#aaa', fontSize: '0.88rem', margin: '6px 0 0' }}>
              📞 +91 8509729245
            </p>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          &copy; {currentYear} ResumeHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
