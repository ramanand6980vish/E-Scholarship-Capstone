import React, { useEffect, useState } from "react";
import "../cssFiles/studentProfile.css";
function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://suffering-sabbath-onstage.ngrok-free.dev/student/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      console.log("API RESPONSE =", data);
      setStudent(data);
    } catch (err) {
      console.log(err);
      setError("Unable to load profile");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <h2>Loading Student Profile...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div className="error-box">
        <h2>{error}</h2>
      </div>
    );
  }
  if (!student) {
    return (
      <div className="error-box">
        <h2>No Student Data Found</h2>
      </div>
    );
  }
  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image-box">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              className="profile-img"
            />
          </div>
          <div className="profile-header-details">
            <h1>{student?.fullName || "N/A"}</h1>
            <p>Student Scholarship Dashboard</p>
          </div>
        </div>
        <div className="profile-body">
          <div className="section-title">
            <h2>Personal Information</h2>
          </div>
          <div className="details-grid">
            <div className="detail-card">
              <span> Aadhaar Number</span>
              <h4>{student?.aadhaarNumber || "N/A"}</h4>
            </div>
            <div className="detail-card">
              <span> Email Address</span>
              <h4>{student?.email || "N/A"}</h4>
            </div>
            <div className="detail-card">
              <span> Mobile Number</span>
              <h4>{student?.mobile || "N/A"}</h4>
            </div>
            <div className="detail-card">
              <span> Date Of Birth</span>
              <h4>{student?.dob || "N/A"}</h4>
            </div>
            <div className="detail-card">
              <span> Gender</span>
              <h4>{student?.gender || "N/A"}</h4>
            </div>
            <div className="detail-card">
              <span> Father Name</span>
              <h4>{student?.fatherName || "N/A"}</h4>
            </div>
            <div className="detail-card">
              <span> Mother Name</span>
              <h4>{student?.motherName || "N/A"}</h4>
            </div>
            <div className="detail-card">
              <span> District</span>
              <h4>{student?.district || "N/A"}</h4>
            </div>
            <div className="detail-card">
              <span> State</span>
              <h4>{student?.state || "N/A"}</h4>
            </div>
            <div className="detail-card">
              <span> Pincode</span>
              <h4>{student?.pincode || "N/A"}</h4>
            </div>
            {/* <div className="detail-card full-width">
              <span> Address</span>
              <h4>{student?.address || "N/A"}</h4>
            </div> */}
            <div className="detail-card full-width">
              <span> Registered On</span>
              <h4>{student?.createdAt || "N/A"}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentProfile;