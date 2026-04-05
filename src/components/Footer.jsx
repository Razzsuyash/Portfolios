import React from 'react';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass">
      <div className="footer-content">
        <div className="footer-left">
          <p>© {new Date().getFullYear()} Suyash Raj. All rights reserved.</p>
        </div>
        <div className="footer-socials">
          <a href="https://github.com/razzsuyash" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={20} /></a>
          <a href="https://linkedin.com/in/razzsuyash" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={20} /></a>
          <a href="mailto:Suyashraj2000@gmail.com" aria-label="Email"><Mail size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
