import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../cssFiles/profileMenu.css";
import profileIcon from "../Assets/profile-icon.png";
import userIcon from "../Assets/user-icon.png";
import StudentDashboard from "./StudentDashboard";
 
function ProfileMenu() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef();

    const toggleMenu = () => {
        setOpen(!open);
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
         navigate("/Homepage");
    };

    const token = localStorage.getItem("token");

    // Close when clicked outside
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="profile-wrapper" ref={menuRef}>

            <div className="profile-icon" onClick={toggleMenu}>
                {token ? (<img width={35} src={profileIcon} alt="Profile" />) :
                    <img width={35} src={userIcon} alt="user" />}
            </div>

            {open && (
                <div className="profile-dropdown">

                    {token ? (
                        <div>
                            <p onClick={() => navigate("/studentProfile")}>My Profile</p>
                            <p onClick={() => navigate("/StudentDashboard")}>Dashboard</p>
                            <p onClick={() => navigate("/settings")}>Settings</p>
                            <p onClick={logout}>Logout</p>
                        </div>
                    ) : (
                        <p onClick={() => navigate("/login")}>Login</p>

                    )}

                </div>
            )}
        </div>
    );
}

export default ProfileMenu;