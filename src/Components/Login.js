import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

import "../cssFiles/setLoader.css";

function Login() {
  const [aadhaar, setAadhaar] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("red");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const r = async () => {
      //   await new Promise((r) => setTimeout(r, 3000))
      // }
      // await r()
      const res = await fetch("https://suffering-sabbath-onstage.ngrok-free.dev/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaar: aadhaar, password: password }),
      });
      console.log("Acha hai")

      const data = await res.text();

      if (res.ok) {
        localStorage.setItem("token", data);

        setMsgColor("green");
        setMessage("Login Successful");
        window.location.href = "/StudentDashboard";

        // navigate("/StudentDashboard");

      } else {
        setMsgColor("pink");
        setMessage(data);
      }
    } catch (error) {
      setMsgColor("red");
      setMessage("Server Error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <h2>Please wait...</h2>
        </div>
      )}
      {<div className="form-container">
        <h2 style={{ textAlign: "center" }}>Student Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Aadhaar"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>



        <p className="extra-text">
          New user? Complete <a href="/otr">OTR</a> first.
        </p>

        {/* ✅ React way */}
        <p style={{ color: msgColor }}>{message}</p>
      </div>
      }
    </>
  );
}

export default Login;