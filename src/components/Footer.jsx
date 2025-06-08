import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h4>3D Model Pro</h4>
            <p>
              Enterprise-grade 3D modeling solutions for businesses of all sizes.
              Convert, edit, and share 3D models with ease.
            </p>
            <div className="social-links">
              <a href="#" aria-label="LinkedIn">
                <span className="social-icon linkedin"></span>
              </a>
              <a href="#" aria-label="Twitter">
                <span className="social-icon twitter"></span>
              </a>
              <a href="#" aria-label="Facebook">
                <span className="social-icon facebook"></span>
              </a>
              <a href="#" aria-label="Instagram">
                <span className="social-icon instagram"></span>
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h5>Products</h5>
            <ul>
              <li><a href="#">3D Converter</a></li>
              <li><a href="#">Model Editor</a></li>
              <li><a href="#">Enterprise Suite</a></li>
              <li><a href="#">API Access</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h5>Resources</h5>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Tutorials</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h5>Company</h5>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Press Kit</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} 3D Model Pro. All rights reserved.
          </div>
          <div className="legal-links">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
