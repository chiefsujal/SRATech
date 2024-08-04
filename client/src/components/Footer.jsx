import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <a href="/" className="footer-logo-link">SRATech</a>
        </div>
        <ul className="footer-links">
          <li><a href="about">About</a></li>
          <li><a href="service">Services</a></li>
          <li><a href="contact">Contact</a></li>
          <li><a href="privacy">Privacy Policy</a></li>
        </ul>
        <div className="footer-social">
          <a href="https://facebook.com" className="social-link">Facebook</a>
          <a href="https://twitter.com" className="social-link">Twitter</a>
          <a href="https://instagram.com" className="social-link">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SRATech. All rights reserved.</p>
      </div>
    </footer>
  );
};


