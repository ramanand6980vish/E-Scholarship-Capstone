import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import "../cssFiles/navbar.css";
import LoginDropdown from "./LoginDropdown";
import StudentNotification from "./StudentNotification";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Real token
  const token = localStorage.getItem("token");

  // Testing:
  // const token = "hu";

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        E-Scholarship Portal
      </div>

      {/* Hamburger */}
      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Nav Links */}
      <ul
        className={`nav-links ${menuOpen ? "active" : ""
          }`}
      >

        {/* loggedInHomepage */}

        <li>
          {token ? (
            <Link to="/loggedInHomepage" onClick={closeMenu}>
              Home
            </Link>
          ) : (
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          )}
        </li>

        {/* <li>
          <Link
            to="/otr"
            onClick={closeMenu}
          >
            OTR
          </Link>
        </li> */}

        {!token && (
          <li>
            <Link
              to="/otr"
              onClick={closeMenu}
            >
              OTR
            </Link>
          </li>
        )}

        {!token && (
          <li>
            <Link
              to="/login  "
              onClick={closeMenu}
            >
              <LoginDropdown />
              {/* Student Login */}
            </Link>
          </li>
        )}

        <li>
          <Link
            to="/track"
            onClick={closeMenu}
          >
            Track Application
          </Link>
        </li>

        <li>
          <Link
            to="/help"
            onClick={closeMenu}
          >
            Help Desk
          </Link>
        </li>

        {token && (
          <li onClick={closeMenu}>
            <StudentNotification />
          </li>
        )}




        <li><ProfileMenu /></li>

        {/* {token && (
          <li
            onClick={closeMenu}
            className="profile-li"
          >
            <ProfileMenu />
          </li>
          
        )} */}
      </ul>

    </nav>
  );
}

export default Navbar;