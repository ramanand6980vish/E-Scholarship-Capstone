import React, { useState, useEffect } from "react";
import "../cssFiles/officerDashboard.css";
import OfficerLogin from "./OfficerLogin";
import { Navigate, useNavigate } from "react-router-dom";

function OfficerDashboard() {
  const [login, setLogin] = useState(false);
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");

  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);

  // Dummy students data
  useEffect(() => {
    // if (!login) {                  change here for login issue
    if (login) {                 
      setStudents([
        {
          id: 1,
          name: "Ramanand Vishwakarma",
          aadhaar: "123456789012",
          mobile: "9060898758",
          scheme: "Post-Matric SC",
          faceKYC: "Verified ✅",
          documentAI: "Passed ✅",
          riskScore: "Low",
          status: "Pending Officer Review"
        },
        {
          id: 2,
          name: "Rishu Kumar",
          aadhaar: "998877665544",
          mobile: "9876543210",
          scheme: "Pre-Matric OBC",
          faceKYC: "Failed ❌",
          documentAI: "Mismatch ⚠️",
          riskScore: "Medium",
          status: "Need Verification"
        },
        {
          id: 3,
          name: "Raushan Singh",
          aadhaar: "112233445566",
          mobile: "8899776655",
          scheme: "Minority Scholarship",
          faceKYC: "Verified ✅",
          documentAI: "Passed ✅",
          riskScore: "Low",
          status: "Ready for Approval"
        },
        {
          id: 4,
          name: "Ayushi Patel",
          aadhaar: "556677889900",
          mobile: "7788990011",
          scheme: "Post-Matric SC",
          faceKYC: "Verified ✅",
          documentAI: "Passed ✅",
          riskScore: "Low",
          status: "Pending Officer Review"

        }
      ]);
    }
  }, [login]);

  const handleLogin = (e) => {
    e.preventDefault();

    // if (officerId === "admin" && password === "1234") {
    //   setLogin(true);
    // } else {
    //   alert("Invalid Officer Credentials");
    // }
  };

  const approveStudent = (id) => {
    const updated = students.map((s) =>
      s.id === id ? { ...s, status: "Approved ✅" } : s
    );
    setStudents(updated);
  };

  const rejectStudent = (id) => {
    const updated = students.map((s) =>
      s.id === id ? { ...s, status: "Rejected ❌" } : s
    );
    setStudents(updated);
  };

  const navigate = useNavigate();

  return (
    <div className="officer-container">

      {/* {!login ?(
        navigate("/officer-login")       change here for login issue
      ) */}
      {login ?(
        navigate("/officer-login")
      )
       : (
        <>
          {/* Dashboard */}
          <div className="dashboard-header">
            <h2>📊 Officer Dashboard</h2>
            <button onClick={() => setLogin(false)}>Logout</button>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-box">
              <h3>{students.length}</h3>
              <p>Total Students</p>
            </div>

            <div className="stat-box">
              <h3>
                {students.filter((s) => s.status.includes("Approved")).length}
              </h3>
              <p>Approved</p>
            </div>

            <div className="stat-box">
              <h3>
                {students.filter((s) => s.status.includes("Pending")).length}
              </h3>
              <p>Pending</p>
            </div>

            <div className="stat-box">
              <h3>
                {students.filter((s) => s.faceKYC.includes("Failed")).length}
              </h3>
              <p>KYC Failed</p>
            </div>
          </div>

          {/* Students Table */}
          <div className="table-box">
            <h3>🎓 Registered Students</h3>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Scheme</th>
                  <th>Face KYC</th>
                  <th>AI Verification</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.scheme}</td>
                    <td>{student.faceKYC}</td>
                    <td>{student.documentAI}</td>
                    <td>{student.status}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => setSelected(student)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Student Details */}
          {selected && (
            <div className="detail-card">
              <h3>📄 Student Verification Details</h3>

              <p><strong>Name:</strong> {selected.name}</p>
              <p><strong>Aadhaar:</strong> {selected.aadhaar}</p>
              <p><strong>Mobile:</strong> {selected.mobile}</p>
              <p><strong>Scheme:</strong> {selected.scheme}</p>
              <p><strong>Face KYC:</strong> {selected.faceKYC}</p>
              <p><strong>Document AI:</strong> {selected.documentAI}</p>
              <p><strong>Risk Score:</strong> {selected.riskScore}</p>
              <p><strong>Status:</strong> {selected.status}</p>

              <div className="action-btns">
                <button onClick={() => approveStudent(selected.id)}>
                  Approve
                </button>

                <button
                  className="reject"
                  onClick={() => rejectStudent(selected.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default OfficerDashboard;