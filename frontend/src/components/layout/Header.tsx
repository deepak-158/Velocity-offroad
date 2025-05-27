import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartIcon from '../common/CartIcon';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Merchandise', href: '/merchandise' },
  { name: 'Sponsors', href: '/sponsors' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-custom">
        <div className="header-container">
          <div className="header-logo">
            <Link to="/" className="logo-link">
              <img 
                src="/images/logo/logo.png" 
                alt="VELOCITY OFFROAD Logo" 
                className="header-logo-image" 
                style={{ height: '120px', width: '200px', marginRight: '15px' }}
              />
              <span className="logo" style={{ display: 'none' }}>VELOCITY OFFROAD</span>
            </Link>
          </div>
          
          <nav className="header-nav">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? 'nav-link-active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <CartIcon />
            
            <div className="header-mobile-menu-button">
              <button 
                onClick={toggleMenu}
                className="menu-button"
                aria-expanded={menuOpen}
                aria-label="Toggle menu"
              >
                <svg 
                  className={menuOpen ? 'hidden' : 'block'} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg 
                  className={menuOpen ? 'block' : 'hidden'} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{menuOpen ? 'Close' : 'Menu'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu - only visible when menuOpen is true */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="container-custom">
            <div className="mobile-menu-links">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`mobile-nav-link ${location.pathname === item.href ? 'mobile-nav-link-active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 