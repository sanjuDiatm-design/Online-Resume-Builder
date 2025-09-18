import React from 'react';
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
            <li><a href="/" className="footer__link">Home</a></li>
            <li><a href="/about" className="footer__link">About Us</a></li>
            <li><a href="/templates" className="footer__link">Templates</a></li>
            <li><a href="/contact" className="footer__link">Contact</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__subheading">Contact Us</h4>
          <div className="footer__contact">
            <a href="sakshamnnda01@gmail.com" className="footer__contact-link">
              <FaEnvelope className="footer__contact-icon" />
              sakshamwork47@gmail.com
            </a>
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
