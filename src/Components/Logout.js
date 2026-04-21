import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        window.location.reload();
        navigate("/");
    };

    return (
        <button className="logout-btn" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;