import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const quickLinks = [
    { title: 'Home', path: '/' },
    { title: 'Courses', path: '/courses' },
    { title: 'Categories', path: '/categories' },
    { title: 'About Us', path: '/about' },
    { title: 'Contact', path: '/contact' }
  ];

  const courseCategories = [
    { title: 'Technology', path: '/categories/tech' },
    { title: 'Fashion', path: '/categories/fashion' },
    { title: 'Leather Crafting', path: '/categories/leather' },
    { title: 'JAMB', path: '/exams/jamb' },
    { title: 'WAEC', path: '/exams/waec' },
    { title: 'NECO', path: '/exams/neco' },
  ];

  const certifications = [
    { title: 'AWS Certifications', path: '/certifications/aws' },
    { title: 'Microsoft Certifications', path: '/certifications/microsoft' },
    { title: 'Data Science', path: '/certifications/data-science' }
  ];

  const legalLinks = [
    { title: 'Privacy Policy', path: '/privacy' },
    { title: 'Terms of Service', path: '/terms' },
    { title: 'Cookie Policy', path: '/cookies' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="footer-logo">Edenites Academy</h3>
            <p className="footer-description">
              Empowering learners worldwide with quality education across diverse fields 
              from technology to creative arts.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          <div className="footer-sections">
            <div className="footer-section">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-list">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="footer-link">{link.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Course Categories</h4>
              <ul className="footer-list">
                {courseCategories.map((category, index) => (
                  <li key={index}>
                    <Link to={category.path} className="footer-link">{category.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Certifications</h4>
              <ul className="footer-list">
                {certifications.map((cert, index) => (
                  <li key={index}>
                    <Link to={cert.path} className="footer-link">{cert.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Newsletter</h4>
              <form className="footer-newsletter">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="footer-input"
                  required
                />
                <button type="submit" className="footer-button">Subscribe</button>
              </form>
              <p className="footer-newsletter-text">
                Get the latest course updates and special offers
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Edenites Academy. All rights reserved.
          </div>
          <div className="footer-legal">
            {legalLinks.map((link, index) => (
              <Link key={index} to={link.path} className="footer-legal-link">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Footer.css'; // Create this file for footer styles

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//             <div className="footer-links">
//             <Link to="/about">About</Link>
//             <Link to="/contact">Contact</Link>
//             <Link to="/privacy">Privacy Policy</Link>
//             <Link to="/terms">Terms of Service</Link>
//             </div>
//             <div className="footer-copyright">
//             © {new Date().getFullYear()} Edenites Academy. All rights reserved.
//             </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;