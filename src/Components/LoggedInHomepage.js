import React from "react";
import { Link } from "react-router-dom";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import "../cssFiles/loggedInHomepage.css";

function LoggedInHomePage() {

    const userName = "Ramanand"; // later replace with API/localStorage

    const chartData = [
        { name: "Jan", applications: 4 },
        { name: "Feb", applications: 7 },
        { name: "Mar", applications: 5 },
        { name: "Apr", applications: 9 },
        { name: "May", applications: 6 },
    ];

    const recentApplications = [
        { id: 1, scheme: "Post-Matric Scholarship", status: "Pending" },
        { id: 2, scheme: "Pre-Matric Scholarship", status: "Approved" },
        { id: 3, scheme: "State Merit Scholarship", status: "Under Review" },
    ];

    return (
        <>

            <div className="home-container">
                <marquee className="marq" behavior="scroll" direction="left" scrollamount="6">
                    📢 Welcome back! You are successfully logged in to E-Scholarship Portal |
                    Track your applications and apply for new schemes easily |
                    New Pre-Matric scholarships are open for 2026 session.
                </marquee>
                <div>
                    <h1 className="welcome">
                        Welcome Back 🎉 <br /> E-Scholarship Portal
                    </h1>

                    <p className="hero-subtitle">
                        Manage your scholarships, track applications, and explore new scheme                      all in one place.
                    </p>
                </div>

                {/* DASHBOARD QUICK ACTIONS */}
                <div className="main-cards">

                    {/* PROFILE CARD */}
                    {/* <div className="main-card">

                        <div className="card-icon">👤</div>
                        <h2>My Profile</h2>

                        <p>View and update your personal details.</p>

                        <ul className="feature-list">
                            <li>✅ Personal Info</li>
                            <li>✅ Aadhaar Linked</li>
                            <li>✅ Education Details</li>
                            <li>✅ Account Settings</li>
                        </ul>

                        <Link to="/profile">
                            <button>View Profile</button>
                        </Link>

                    </div> */}

                    {/* SCHOLARSHIPS CARD */}
                    <div className="main-card">

                        <div className="card-icon">🎓</div>

                        <h2>Scholarships</h2>

                        <p>Explore and apply for available schemes.</p>

                        <ul className="feature-list">
                            <li>✅ Pre-Matric</li>
                            <li>✅ Post-Matric</li>
                            <li>✅ Central Schemes</li>
                            <li>✅ State Schemes</li>
                        </ul>

                        <Link to="/schemes">
                            <button>View Schemes</button>
                        </Link>

                    </div>

                    {/* TRACKING CARD */}
                    <div className="main-card">

                        <div className="card-icon">📊</div>

                        <h2>Application Status</h2>

                        <p>Track your scholarship application progress.</p>

                        <ul className="feature-list">
                            <li>✅ Submitted Forms</li>
                            <li>✅ Under Review</li>
                            <li>✅ Approved / Rejected</li>
                            <li>✅ Payment Status</li>
                        </ul>

                        <Link to="/track">
                            <button>Track Now</button>
                        </Link>

                    </div>

                </div>
            </div>


            {/* ANNOUNCEMENTS */}
            <div className="announcement-card">

                <div className="announcement-header">
                    <h2>📢 Latest Updates</h2>
                    <p>Important notifications for students</p>
                </div>

                <div className="announcement-body">

                    <div className="announcement-item">
                        <span className="tag new">NEW</span>
                        <p>Pre-Matric Scholarship 2026 applications are live.</p>                     </div>

                    <div className="announcement-item">
                        <span className="tag update">UPDATE</span>
                        <p>OTR is mandatory for all scholarship applications.</p>
                    </div>

                    <div className="announcement-item">
                        <span className="tag info">INFO</span>                         <p>Track your application status in real-time dashboard.</p>
                    </div>

                </div>

            </div>







            {/* STATS + CHART */}
            <div className="stats-section">

                <div className="stats-box">
                    <h3>📌 Applications Overview</h3>

                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="applications" stroke="#4f46e5" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="stats-cards">

                    <div className="stat">
                        <h2>12</h2>
                        <p>Total Applications</p>
                    </div>

                    <div className="stat">
                        <h2>5</h2>
                        <p>Approved</p>
                    </div>

                    <div className="stat">
                        <h2>3</h2>
                        <p>Pending</p>
                    </div>

                </div>

            </div>

            {/* RECENT APPLICATIONS */}
            <div className="recent-section">

                <h2>📄 Recent Applications</h2>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Scheme</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recentApplications.map(app => (
                            <tr key={app.id}>
                                <td>{app.scheme}</td>
                                <td>
                                    <span className={`status ${app.status.toLowerCase().replace(" ", "-")}`}>
                                        {app.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* OTR */}
            <div className="otr-card">

                <h2>🎓 OTR System</h2>
                <p>Your permanent scholarship identity for all future applications.</p>

                <Link to="/otr">
                    <button>View OTR</button>
                </Link>

            </div>

            {/* CHATBOT BUTTON */}
            <div className="chatbot-float">
                💬
            </div>

        </>
    );
}

export default LoggedInHomePage;
