import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ExploreDropdown.css';

const ExploreDropdown = ({ mobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setActiveSubmenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.explore-dropdown')) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  return (
    <div 
      className={`explore-dropdown ${mobile ? 'mobile' : ''}`}
      onMouseEnter={!mobile ? () => setIsOpen(true) : undefined}
      onMouseLeave={!mobile ? () => {
        setIsOpen(false);
        setActiveSubmenu(null);
      } : undefined}
    >
      <button 
        className="explore-button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Explore courses dropdown"
      >
        Explore <span className="dropdown-arrow">{isOpen ? '▼' : '▶'}</span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="dropdown-content"
          >
            <div className="dropdown-grid">
              {/* IT & Software Section */}
              <div className="dropdown-section">
                <h4>IT & Software</h4>
                <div 
                  className="submenu-trigger"
                  onMouseEnter={() => !mobile && toggleSubmenu('certifications')}
                  onClick={() => mobile && toggleSubmenu('certifications')}
                >
                  <span>Certifications ▼</span>
                  {activeSubmenu === 'certifications' && (
                    <div className="submenu">
                      <Link to="/it/aws" onClick={() => setIsOpen(false)}>AWS Certifications</Link>
                      <Link to="/it/comptia" onClick={() => setIsOpen(false)}>CompTIA</Link>
                      <Link to="/it/cisco" onClick={() => setIsOpen(false)}>Cisco (CCNA)</Link>
                      <Link to="/it/microsoft" onClick={() => setIsOpen(false)}>Microsoft</Link>
                    </div>
                  )}
                </div>
                <div 
                  className="submenu-trigger"
                  onMouseEnter={() => !mobile && toggleSubmenu('development')}
                  onClick={() => mobile && toggleSubmenu('development')}
                >
                  <span>Development ▼</span>
                  {activeSubmenu === 'development' && (
                    <div className="submenu">
                      <Link to="/it/web" onClick={() => setIsOpen(false)}>Web Development</Link>
                      <Link to="/it/mobile" onClick={() => setIsOpen(false)}>Mobile Development</Link>
                      <Link to="/it/game" onClick={() => setIsOpen(false)}>Game Development</Link>
                      <Link to="/it/database" onClick={() => setIsOpen(false)}>Database Design</Link>
                    </div>
                  )}
                </div>
                <div 
                  className="submenu-trigger"
                  onMouseEnter={() => !mobile && toggleSubmenu('topics')}
                  onClick={() => mobile && toggleSubmenu('topics')}
                >
                  <span>Popular Topics ▼</span>
                  {activeSubmenu === 'topics' && (
                    <div className="submenu">
                      <Link to="/it/javascript" onClick={() => setIsOpen(false)}>JavaScript</Link>
                      <Link to="/it/python" onClick={() => setIsOpen(false)}>Python</Link>
                      <Link to="/it/react" onClick={() => setIsOpen(false)}>React</Link>
                      <Link to="/it/cybersecurity" onClick={() => setIsOpen(false)}>Cybersecurity</Link>
                    </div>
                  )}
                </div>
                <Link to="/it/network" onClick={() => setIsOpen(false)}>Network & Security</Link>
                <Link to="/it/hardware" onClick={() => setIsOpen(false)}>Hardware</Link>
                <Link to="/it/os" onClick={() => setIsOpen(false)}>Operating Systems</Link>
              </div>

              {/* Fashion Design Section */}
              <div className="dropdown-section">
                <h4>Fashion Design</h4>
                <div className="submenu-trigger"
                  onMouseEnter={() => !mobile && toggleSubmenu('fashion-core')}
                  onClick={() => mobile && toggleSubmenu('fashion-core')}
                >
                  <span>Core Skills ▼</span>
                  {activeSubmenu === 'fashion-core' && (
                    <div className="submenu">
                      <Link to="/fashion/pattern-making" onClick={() => setIsOpen(false)}>Pattern Making</Link>
                      <Link to="/fashion/sewing" onClick={() => setIsOpen(false)}>Sewing Techniques</Link>
                      <Link to="/fashion/textiles" onClick={() => setIsOpen(false)}>Textiles & Fabrics</Link>
                    </div>
                  )}
                </div>
                <div className="submenu-trigger"
                  onMouseEnter={() => !mobile && toggleSubmenu('fashion-adv')}
                  onClick={() => mobile && toggleSubmenu('fashion-adv')}
                >
                  <span>Specializations ▼</span>
                  {activeSubmenu === 'fashion-adv' && (
                    <div className="submenu">
                      <Link to="/fashion/3d-design" onClick={() => setIsOpen(false)}>3D Fashion Design</Link>
                      <Link to="/fashion/jewelry" onClick={() => setIsOpen(false)}>Jewelry Design</Link>
                      <Link to="/fashion/illustration" onClick={() => setIsOpen(false)}>Fashion Illustration</Link>
                    </div>
                  )}
                </div>
                <Link to="/fashion/business" onClick={() => setIsOpen(false)}>Fashion Business</Link>
              </div>

              {/* Leather Crafting Section */}
              <div className="dropdown-section">
                <h4>Leather Crafting</h4>
                <div className="submenu-trigger"
                  onMouseEnter={() => !mobile && toggleSubmenu('leather-core')}
                  onClick={() => mobile && toggleSubmenu('leather-core')}
                >
                  <span>Core Products ▼</span>
                  {activeSubmenu === 'leather-core' && (
                    <div className="submenu">
                      <Link to="/leather/shoes" onClick={() => setIsOpen(false)}>Shoe Making</Link>
                      <Link to="/leather/sandals" onClick={() => setIsOpen(false)}>Sandals</Link>
                      <Link to="/leather/bags" onClick={() => setIsOpen(false)}>Bags & Accessories</Link>
                    </div>
                  )}
                </div>
                <div className="submenu-trigger"
                  onMouseEnter={() => !mobile && toggleSubmenu('leather-tech')}
                  onClick={() => mobile && toggleSubmenu('leather-tech')}
                >
                  <span>Techniques ▼</span>
                  {activeSubmenu === 'leather-tech' && (
                    <div className="submenu">
                      <Link to="/leather/tooling" onClick={() => setIsOpen(false)}>Leather Tooling</Link>
                      <Link to="/leather/stitching" onClick={() => setIsOpen(false)}>Stitching Methods</Link>
                      <Link to="/leather/finishing" onClick={() => setIsOpen(false)}>Finishing Techniques</Link>
                    </div>
                  )}
                </div>
                <Link to="/leather/business" onClick={() => setIsOpen(false)}>Leather Business</Link>
              </div>

              {/* Education & Exams Section */}
              <div className="dropdown-section">
                <h4>Education & Exams</h4>
                <div className="submenu-trigger"
                  onMouseEnter={() => !mobile && toggleSubmenu('exams')}
                  onClick={() => mobile && toggleSubmenu('exams')}
                >
                  <span>Exam Preparation ▼</span>
                  {activeSubmenu === 'exams' && (
                    <div className="submenu">
                      <Link to="/exams/jamb" onClick={() => setIsOpen(false)}>JAMB Prep</Link>
                      <Link to="/exams/waec" onClick={() => setIsOpen(false)}>WAEC Prep</Link>
                      <Link to="/exams/neco" onClick={() => setIsOpen(false)}>NECO Prep</Link>
                    </div>
                  )}
                </div>
                <div className="submenu-trigger"
                  onMouseEnter={() => !mobile && toggleSubmenu('academics')}
                  onClick={() => mobile && toggleSubmenu('academics')}
                >
                  <span>Teaching & Academics ▼</span>
                  {activeSubmenu === 'academics' && (
                    <div className="submenu">
                      <Link to="/academics/math" onClick={() => setIsOpen(false)}>Mathematics</Link>
                      <Link to="/academics/science" onClick={() => setIsOpen(false)}>Sciences</Link>
                      <Link to="/academics/humanities" onClick={() => setIsOpen(false)}>Humanities</Link>
                      <Link to="/academics/languages" onClick={() => setIsOpen(false)}>Language Learning</Link>
                    </div>
                  )}
                </div>
                <Link to="/academics/teacher-training" onClick={() => setIsOpen(false)}>Teacher Training</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExploreDropdown;







