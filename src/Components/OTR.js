import React, { useState } from "react";
import "../cssFiles/setLoader.css";
import { Link, useNavigate } from "react-router-dom";
import FaceKYC from "./FaceKYC";
import "../cssFiles/otr.css";



function OTR() {

  const [step, setStep] = useState(1);

  const [mobile, setMobile] = useState("");
  const [otpMobile, setOtpMobile] = useState("");

  const [aadhaar, setAadhaar] = useState("");
  const [otpAadhaar, setOtpAadhaar] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showMobileOtp, setShowMobileOtp] = useState(false);
  const [showAadhaarOtp, setShowAadhaarOtp] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = new useNavigate();


  const resetMsg = () => {
    setMessage("");
    setError("");
  };

  const proceed = () => {
    setStep(4);
  };

  function Proc({ status, proceed }) {
    return (
      <>
        {status === "Live Face Verified ✅" && (
          <button onClick={proceed}>Proceed</button>
        )}
      </>
    );
  }

  // -------- MOBILE --------

  const sendMobileOtp = async () => {
    resetMsg();

    if (!/^[0-9]{10}$/.test(mobile))
      return setError("Invalid Mobile Number");
    setLoading(true);

    try {
      const res = await fetch(
        `https://suffering-sabbath-onstage.ngrok-free.dev/otr/sendOtpToMobile?mobile=${mobile}`,
        { method: "POST" }
      );

      const data = await res.text();

      if (data === "Success") {
        setMessage("OTP Sent ✅");
        setShowMobileOtp(true);
      } else setError(data);

    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const verifyMobileOtp = async () => {
    resetMsg();

    if (!otpMobile) return setError("Enter OTP");
    setLoading(true);
    try {
      const res = await fetch(
        "https://suffering-sabbath-onstage.ngrok-free.dev/otr/otp-verify-mobile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: mobile, otp: otpMobile })
        }
      );

      if (res.ok) {
        setMessage("Mobile Verified ✅");
        setStep(2);
      } else setError("Invalid OTP ❌");

    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // -------- AADHAAR --------

  const sendAadhaarOtp = async () => {
    resetMsg();

    if (!/^[0-9]{12}$/.test(aadhaar))
      return setError("Invalid Aadhaar");
    setLoading(true);

    try {
      const res = await fetch(
        "https://suffering-sabbath-onstage.ngrok-free.dev/otr/sent-otp-aadhaar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ aadharNumber: aadhaar })
        }
      );

      const data = await res.text();

      setMessage(data);
      setShowAadhaarOtp(true);

    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }

  };



  const verifyAadhaarOtp = async () => {
    resetMsg();

    if (!otpAadhaar) return setError("Enter OTP");
    setLoading(true);

    try {
      const res = await fetch(
        "https://suffering-sabbath-onstage.ngrok-free.dev/otr/verify-otp-aadhar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: mobile, otp: otpAadhaar })
        }
      );

      if (res.ok) {
        setMessage("Aadhaar Verified ✅");
        localStorage.setItem("aadhaar", aadhaar);

        setStep(3);
      } else setError("Invalid OTP ❌");

    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // -------- REGISTER --------

  const handleRegister = async (e) => {
    e.preventDefault();
    resetMsg();

    if (password !== confirmPassword)
      return setError("Passwords do not match");
    setLoading(true);

    try {
      const res = await fetch(
        "https://suffering-sabbath-onstage.ngrok-free.dev/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: fullName,
            email,
            mobile,
            aadhaar,
            password
          })
        }
      );

      const data = await res.text();

      setMessage(data);
      setStep(4);

    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const [status, setstatus] = useState("");

  function FaceVerify({ status }) {
    setstatus(status);
  }

  const steps = ["Mobile", "Aadhaar", "KYC", "Finish"];

  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <h2>Please wait...</h2>
        </div>
      )}
      <div className="container">

        <h2>One Time Registration</h2>

        {/* STEPS */}
        <div className="steps">
          {steps.map((label, i) => (
            <div key={i} className={`step ${step === i + 1 ? "active" : ""}`}>
              <div className="circle">{i + 1}</div>
              <p>{label}</p>
            </div>
          ))}
        </div>


        {/* STEP 1 */}
        {step === 1 && (
          <div className="card">
            <input placeholder="Mobile" value={mobile} onChange={e => setMobile(e.target.value)} />
            <button onClick={sendMobileOtp}>Send OTP</button>

            {showMobileOtp && (
              <>
                <input placeholder="Enter OTP" value={otpMobile} onChange={e => setOtpMobile(e.target.value)} />
                <button onClick={verifyMobileOtp}>Verify</button>
              </>
            )}
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="card">
            <input placeholder="Aadhaar" value={aadhaar} onChange={e => setAadhaar(e.target.value)} />
            <button onClick={sendAadhaarOtp}>Send OTP</button>

            {showAadhaarOtp && (
              <>
                <input placeholder="Enter OTP" value={otpAadhaar} onChange={e => setOtpAadhaar(e.target.value)} />
                <button onClick={verifyAadhaarOtp}>Verify</button>
              </>
            )}
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <FaceKYC />
            {/* <Proc status={status} proceed={proceed} /> */}
          </>
        )}

        {step === 4 && (
          <div className="success-card">
            <h2>Registration Completed ✅</h2> <br />
            <p>Your OTR ID has been created successfully.</p>
            <p>Use your Aadhaar Number to login.</p><br />

            <button onClick={() => navigate("/login")}>
              Login Now
            </button>
          </div>
        )}

        {step !== 4 && (
          <p className={error ? "error-text" : "success-text"}>
            {error || message}
          </p>

        )}
      </div>
    </>
  );
}

export default OTR;