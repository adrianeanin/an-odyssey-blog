import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="wrapper | header">
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Anodyssey
        </NavLink>

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

        <a href="#">Photo Odyssey</a>
      </nav>
    </header>
  );
};

export default Header;
