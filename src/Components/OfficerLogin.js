import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../cssFiles/officerLogin.css";

function OfficerLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // basic demo validation (replace with API later)
        if (email === "" || password === "") {
            alert("Please fill all fields");
            return;
        }

        // fake auth token
        localStorage.setItem("token", "officer-token");

        alert("Officer Login Successful");

        navigate("/officer-dashboard");
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h2>🧑‍💼 Officer Login</h2>
                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Officer Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default OfficerLogin;