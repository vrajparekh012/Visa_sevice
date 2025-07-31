// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import './styles/footer.css';

const Footer = () => {
  const openSocial = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <h3>Viseas</h3>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/countries">Countries</Link>
            <Link to="/contact">Contact us</Link>
          </div>
          <div className="social-links">
            <button
              onClick={() => openSocial('https://facebook.com')}
              className="social-btn"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </button>
            <button
              onClick={() => openSocial('https://twitter.com')}
              className="social-btn"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </button>
            <button
              onClick={() => openSocial('https://instagram.com')}
              className="social-btn"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </button>
            <button
              onClick={() => openSocial('https://linkedin.com')}
              className="social-btn"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </button>
          </div>
          <p className="copyright">
            © {new Date().getFullYear()} VISEAS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
