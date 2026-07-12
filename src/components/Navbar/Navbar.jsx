import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/images/snapchat-logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Snapchat" />
        <span>Snapchat</span>
      </div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <a href="#features" onClick={() => setMenuOpen(false)}>
            Features
          </a>
        </li>

        <li>
          <a href="#download" onClick={() => setMenuOpen(false)}>
            Download
          </a>
        </li>

        <li>
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            Log In
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;