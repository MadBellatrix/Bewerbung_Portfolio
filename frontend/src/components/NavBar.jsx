import { useState, useEffect } from "react";
// Falls du React Router nutzt:
import { useLocation } from "react-router-dom"; 
import "./NavBar.css"; // WICHTIG: Import der Standard-CSS Datei

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Falls du kein React-Router hast, kannst du diesen Block löschen/auskommentieren
  const location = useLocation();
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-logo">
        <span className="accent">&gt;</span> ./portfolio
      </div>

      <button 
        className={`hamburger-btn ${isMenuOpen ? "open" : ""}`} 
        onClick={toggleMenu}
        aria-label="Menü öffnen"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Navigation Links */}
      <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <a href="#home" className="nav-link" onClick={closeMenu}>&gt; home</a>
        <a href="#about" className="nav-link" onClick={closeMenu}>&gt; about</a>
        <a href="#projects" className="nav-link" onClick={closeMenu}>&gt; projects</a>
        <a href="#contact" className="nav-link" onClick={closeMenu}>&gt; contact</a>
      </nav>
    </header>
  );
}

export default NavBar;
