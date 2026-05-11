import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
// import "../cssFiles/studentDashboard.css";

function StudentDashboard() {

 
    return (

        <div className="dashboard-container">

            <h2>Student Dashboard</h2>

            <div className="dashboard-cards">

                <div className="dash-card">
                    <h3>All Scholarships</h3>
                    <p>Explore all available scholarship programs, eligibility details, and application deadlines</p>
                    <Link to="/scholarshipApply">
                        <button>Explore Now</button>
                    </Link>
                </div>

                <div className="dash-card">
                    <h3>Track Application</h3>
                    <p>Check your application status.</p>
                    <Link to="/track">
                        <button>Track Status</button>
                    </Link>
                </div>

                <div className="dash-card">
                    <h3>Payment Status</h3>
                    <p>Check scholarship payment updates.</p>
                    <button>View Payment</button>
                </div>
 

                <div className="dash-card">
                    <h3>Complaint Portal</h3>
                    <p>Raise issues regarding scholarship.</p>
                    <Link to="/helpdesk">
                        <button>Submit Complaint</button>
                    </Link>
                </div>

            </div>
            {/* <Logout /> */}

        </div>

    )

}

export default StudentDashboard