import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Network, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'glass' : ''}`}>
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <Network className="logo-icon" size={28} />
          <span className="logo-text text-gradient">Suyash.</span>
        </NavLink>

        <div className="desktop-menu">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
          <NavLink to="/projects" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Projects</NavLink>
          <NavLink to="/experience" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Experience</NavLink>
          <NavLink to="/contact" className="button-primary nav-cta">Contact Me</NavLink>
        </div>

        <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu glass animate-fade-in">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="mobile-link">Home</NavLink>
          <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className="mobile-link">About</NavLink>
          <NavLink to="/projects" onClick={() => setMobileMenuOpen(false)} className="mobile-link">Projects</NavLink>
          <NavLink to="/experience" onClick={() => setMobileMenuOpen(false)} className="mobile-link">Experience</NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className="mobile-link text-accent">Contact</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
