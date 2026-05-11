import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../cssFiles/officerDashboard.css";

function OfficerDashboard() {

  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {

    try {

      const response = await fetch(
        "https://suffering-sabbath-onstage.ngrok-free.dev/stateOfficer/getAllApplyData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("API DATA:", data);

      // store complete api data in localStorage
      localStorage.setItem(
        "allStudentsData",
        JSON.stringify(data)
      );

      setStudents(data);

    } catch (error) {

      console.error("Error Fetching Data:", error);

    }
  };

  const openStudentDetails = (student) => {

    localStorage.setItem(
      "selectedStudent",
      JSON.stringify(student)
    );

    navigate("/studentView4Officer");
  };

  return (

    <div className="officer-container">

      <div className="dashboard-header">
        <h2>📊 Officer Dashboard</h2>
      </div>

      <div className="table-box">

        <h3>🎓 Registered Students</h3>

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Aadhaar</th>
              <th>Application ID</th>
              <th>Category</th>
              <th>Mobile</th>
              <th>Scheme</th>
              <th>Type</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.applicationId}>
                <td>{student.name}</td>
                <td>{student.aadhaar}</td>
                <td>{student.applicationId}</td>
                <td>{student.casteCategory}</td>
                <td>{student.mobile}</td>
                <td>{student.scheme}</td>
                <td>{student.type}</td>
                <td>{student.date}</td>
                <td>
                  <button onClick={() => openStudentDetails(student)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>

  );

}

export default OfficerDashboard;