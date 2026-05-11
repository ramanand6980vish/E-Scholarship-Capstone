import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../cssFiles/officerLogin.css";

function OfficerLogin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        if (username.trim() === "" || password.trim() === "") {
            alert("Please fill all fields");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                "https://suffering-sabbath-onstage.ngrok-free.dev/stateOfficer/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            // safer response handling
            const text = await response.text();

            let data = {};

            

            console.log("Response Data:", data);

            if (response.ok) {

                // save token if available
                if (data.token) {
                    localStorage.setItem("token", data.token);
                }

                // save officer info
                localStorage.setItem(
                    "officerData",
                    JSON.stringify(data)
                );

                alert("Officer Login Successful");

                navigate("/officer-dashboard");

            } else {

                alert(
                    data.message ||
                    data.error ||
                    "Invalid Credentials"
                );

            }

        } catch (error) {

            console.error("Login Error:", error);

            alert("Server Error or Network Issue");

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h2>🧑‍💼 Officer Login</h2>

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        placeholder="Officer Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default OfficerLogin;