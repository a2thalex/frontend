import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About nTunz</h3>
            <p>nTunz is a platform for music lovers to discover, share, and connect through their favorite tracks.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/explore">Explore</Link></li>
              <li><Link to="/upload">Upload</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <ul>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 nTunz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
