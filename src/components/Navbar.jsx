import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Mario's Market Fantasy Baseball League
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={menuOpen ? "hamburger open" : "hamburger"}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={location.pathname === "/" ? "nav-link active" : "nav-link"}
              onClick={() => setMenuOpen(false)}
            >
              Picks By Team
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/standings" 
              className={location.pathname === "/standings" ? "nav-link active" : "nav-link"}
              onClick={() => setMenuOpen(false)}
            >
              Standings
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/tournament" 
              className={location.pathname === "/tournament" ? "nav-link active" : "nav-link"}
              onClick={() => setMenuOpen(false)}
            >
              Tournament
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;