import { NavLink } from "react-router-dom";
import DarkThemeToggle from "./DarkThemeToggle";
import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef();

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNavbar = () => {
    setIsNavOpen(false);
  };

  return (
    <header>
      <div className="header | wrapper">
        <nav
          ref={navRef}
          className={isNavOpen ? "responsive-nav" : ""}
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            onClick={closeNavbar}
            className={({ isActive }) =>
              isActive ? "active | header-home" : "header-home"
            }
            aria-label="Anodyssey home"
          >
            Anodyssey 🚀
          </NavLink>

          <div className="header-links">
            <NavLink
              to="inspiring"
              onClick={closeNavbar}
              className={({ isActive }) => (isActive ? "active" : "")}
              aria-label="inspiring"
            >
              Inspiring
            </NavLink>

            <NavLink
              to="tech"
              onClick={closeNavbar}
              className={({ isActive }) => (isActive ? "active" : "")}
              aria-label="tech"
            >
              Tech
            </NavLink>

            <NavLink
              to="tutorials"
              onClick={closeNavbar}
              className={({ isActive }) => (isActive ? "active" : "")}
              aria-label="tutorials"
            >
              Tutorials
            </NavLink>
          </div>

          <div className="header-links-right">
            <a href="#" id="photo-odyssey">
              Photo Odyssey
            </a>
            <DarkThemeToggle />

            <button
              className="nav-btn nav-close-btn"
              onClick={closeNavbar}
              aria-label="Close navigation"
            >
              <FaTimes />
            </button>
          </div>
        </nav>
        <button
          className={isNavOpen ? "nav-btn | hidden" : "nav-btn"}
          onClick={toggleNavbar}
          aria-label={isNavOpen ? "Close menu" : "Open menu"}
          aria-expanded={isNavOpen ? "true" : "false"}
        >
          <FaBars />
        </button>
      </div>
    </header>
  );
};

export default Header;
