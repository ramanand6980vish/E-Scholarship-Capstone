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
    console.log("Working");
    try {
      const token = localStorage.getItem("token") || "";
      console.log("Working try");
      const cleanToken = token.replace(/^Bearer\s+/i, "").trim();

      const response = await fetch(
        "https://suffering-sabbath-onstage.ngrok-free.dev/student/dashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Working,............")

      if (!response.ok) {
        console.log("not Working");
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setStudent(data);
    } catch (err) {
      setError("Unable to load profile");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-danger mt-5">{error}</h2>;
  }

  return (
    <div className="container mt-5 mb-5"> Raushan
      <div className="card shadow-lg border-0 profile-card">
        <div className="card-header bg-primary text-white text-center">
          <h2>Student Profile</h2>
        </div>

        <div className="card-body">
          <div className="text-center mb-4">
            <img
              alt="Profile"
              className="profile-img"
            />
            <h3 className="mt-3">{student.fullName}</h3>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <p><strong>Aadhaar:</strong> {student.aadhaarNumber}</p>
            </div>

            <div className="col-md-6">
              <p><strong>Email:</strong> {student.email}</p>
            </div>

            <div className="col-md-6">
              <p><strong>Mobile:</strong> {student.mobile}</p>
            </div>

            <div className="col-md-6">
              <p><strong>DOB:</strong> {student.dob}</p>
            </div>

            <div className="col-md-6">
              <p><strong>Gender:</strong> {student.gender}</p>
            </div>

            <div className="col-md-6">
              <p><strong>Father Name:</strong> {student.fatherName}</p>
            </div>

            <div className="col-md-6">
              <p><strong>Mother Name:</strong> {student.motherName}</p>
            </div>

            <div className="col-md-6">
              <p><strong>District:</strong> {student.district}</p>
            </div>

            <div className="col-md-6">
              <p><strong>State:</strong> {student.state}</p>
            </div>

            <div className="col-md-6">
              <p><strong>Pincode:</strong> {student.pincode}</p>
            </div>

            <div className="col-md-12">
              <p><strong>Address:</strong> {student.address || "N/A"}</p>
            </div>

            <div className="col-md-12">
              <p><strong>Registered On:</strong> {student.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;