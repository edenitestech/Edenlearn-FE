import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import ExploreDropdown from './ExploreDropdown';
import SearchBar from './SearchBar'; // Import the SearchBar component
import logo from '../assets/e-favicon2.png';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
      if (window.innerWidth > 1000) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Edenites Logo" className="logo" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="navbar-desktop">
          <ExploreDropdown />
          
          <Link to="/careers" className="nav-link">Careers</Link>
          
          <SearchBar /> {/* Using SearchBar component */}
          
          <div className="navbar-links">
            <Link to="/courses" className="nav-link">Courses</Link>
            <Link to="/teach" className="nav-link">Teach With Us</Link>
          </div>
          
          <div className="navbar-right navbar-auth">
            <Link to="/login" className="nav-link">Log In</Link>
            <Link to="/login?form=signup" className="signup-btn">Join for Free</Link>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <>
          <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
            <HiMenu size={24} />
          </button>
          
          {isMenuOpen && (
            <div className="mobile-menu">
              <button className="close-btn" onClick={closeMenu} aria-label="Close menu">
                <FaTimes size={20} />
              </button>
              <ul>
                <li>
                  <ExploreDropdown mobile />
                </li>
                <li><Link to="/careers" className="nav-link" onClick={closeMenu}>Careers</Link></li>
                <li>
                  <SearchBar isMobile={true} /> {/* Mobile version of SearchBar */}
                </li>
                <li><Link to="/courses" className="nav-link" onClick={closeMenu}>Courses</Link></li>
                <li><Link to="/teach" className="nav-link" onClick={closeMenu}>Teach on Edenites</Link></li>
                <li><Link to="/login" className="nav-link" onClick={closeMenu}>Log in</Link></li>
                <li><Link to="/login" className="signup-btn" onClick={closeMenu}>Join for Free</Link></li>
              </ul>
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;