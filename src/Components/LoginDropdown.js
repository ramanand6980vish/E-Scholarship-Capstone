import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssFiles/loginDropdown.css";

function Navbar() {

    const [loginOpen, setLoginOpen] = useState(false);
    const menuRef = useRef();
    const navigate = useNavigate();

    const toggleLogin = () => {
        setLoginOpen(!loginOpen);
    };

    const handleSelect = (role) => {
        setLoginOpen(false);

        if (role === "student") navigate("/student-login");
        if (role === "officer") navigate("/officer-login");
        // if (role === "admin") navigate("/admin-login");
    };

    // close when clicked outside
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setLoginOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
 
        <ul className="nav-links">

            {/* LOGIN DROPDOWN */}
            <li className="login-dropdown" ref={menuRef}>

                <button className="login-btn" onClick={toggleLogin}>
                    Login
                </button>

                {loginOpen && (
                    <ul className="dropdown-menu">

                        <li onClick={() => handleSelect("student")}>
                            🎓 Student
                        </li>

                        <li onClick={() => handleSelect("officer")}>
                            🧑‍💼 Officer
                        </li>


                    </ul>
                )}

            </li>

        </ul>

    );
}

export default Navbar;