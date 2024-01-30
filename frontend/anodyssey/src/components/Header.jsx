import { NavLink } from "react-router-dom";
import DarkThemeToggle from "./DarkThemeToggle";

const Header = () => {
  return (
    <header>
      <div className="header | wrapper">
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active | header-home" : "header-home"
            }
          >
            Anodyssey 🚀
          </NavLink>

          <div className="header-links">
            <NavLink
              to="inspiring"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Inspiring
            </NavLink>

            <NavLink
              to="tech"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Tech
            </NavLink>

            <NavLink
              to="tutorials"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Tutorials
            </NavLink>
          </div>

          <div className="header-links-right">
            <a href="#">Photo Odyssey</a>
            <DarkThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
