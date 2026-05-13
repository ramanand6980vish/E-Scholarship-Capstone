import React from "react";
import { Link } from "react-router-dom";
import "../cssFiles/homePage.css";

function HomePage() {
    return (
        <>
            {/* HERO SECTION */}
            <div className="home-container">

                <marquee className="marq" behavior="scroll" direction="left" scrollamount="6">
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        📢 पोस्ट-मैट्रिक पंजीकरण (2025-26) बंद हो गए हैं | कृपया नई अधिसूचना की प्रतीक्षा करें |
                        Pre-Matric registrations are now open for 2026.
                    </a>
                </marquee>

                <div>
                    <h1 className="welcome"> Welcome to <br /> E-Scholarship Portal</h1>
                    <p className="hero-subtitle">
                        A smart platform for scholarship registration, verification, tracking &
                        transparent approval process.
                    </p>
                </div>


                <div className="main-cards">

                    {/* STUDENT CARD */}
                    <div className="main-card">

                        <div className="card-icon"></div>

                        <h2>Students</h2>

                        <p>Apply, manage and track scholarships online.</p>

                        <ul className="feature-list">
                            <li>✅ OTR Registration</li>
                            <li>✅ Scholarship Apply</li>
                            <li>✅ Track Status</li>
                            <li>✅ Upload Documents</li>
                        </ul>

                        <Link to="/otr">
                            <button>OTR Registration</button>
                        </Link>

                        <Link to="/login">
                            <button>Student Login</button>
                        </Link>

                    </div>

                    {/* OFFICER CARD */}
                    <div className="main-card">

                        {/* <div className="card-icon">🧑‍💼</div> */}

                        <h2>Officers</h2>

                        <p>Verify, review and approve scholarship applications.</p>

                        <ul className="feature-list">
                            <li>✅ Student Verification</li>
                            <li>✅ Document Approval</li>
                            <li>✅ Dashboard Reports</li>
                            <li>✅ Final Approval</li>
                        </ul>

                        <Link to="/officer-login">
                            <button>Officer Login</button>
                        </Link>

                    </div>

                </div>

            </div>

            {/* OTR SECTION */}
            <div className="otr-card">

                <div className="otr-header">
                    <h2>🎓 One Time Registration (OTR)</h2>
                    <p>Your Gateway to Scholarship Applications</p>
                </div>

                <div className="otr-body">

                    <p>
                        <strong>OTR (One Time Registration)</strong> is a unique registration
                        number generated using your{" "}
                        <strong>Aadhaar Number / Aadhaar Enrolment ID (EID)</strong>.
                        It remains valid throughout your complete academic career.
                    </p>

                    <p>
                        Register once and use the same OTR every year for scholarship
                        applications.
                    </p>

                    <div className="otr-benefits">

                        <h4>✨ Benefits</h4>

                        <ul>
                            <li>✅ One-time registration only</li>
                            <li>✅ Apply every year easily</li>
                            <li>✅ Faster verification process</li>
                            <li>✅ Track scholarship status</li>
                            <li>✅ Secure student identity</li>
                            <li>✅ Less paperwork</li>
                            <li>✅ Quick processing</li>
                        </ul>

                    </div>

                    <div className="stats-row">
                        <div className="stat-box">
                            <h3>10K+</h3>
                            <p>Students Registered</p>
                        </div>

                        <div className="stat-box">
                            <h3>5000+</h3>
                            <p>Scholarships Approved</p>
                        </div>

                        <div className="stat-box">
                            <h3>100%</h3>
                            <p>Digital Process</p>
                        </div>
                    </div>

                    <p className="mandatory-text">
                        ⚠️ OTR is mandatory to apply for scholarships.
                    </p>

                    <button className="otr-btn">
                        <Link to="/otr">Register Now</Link>
                    </button>

                </div>

            </div>

            {/* ANNOUNCEMENT SECTION */}
            <div className="announcement-card">

                <div className="announcement-header">
                    <h2>📢 Scholarship Announcements</h2>
                    <p>Latest updates, deadlines & important notices</p>
                </div>

                <div className="announcement-body">

                    <div className="announcement-item">
                        <span className="tag new">NEW</span>
                        <p>
                            Pre-Matric Scholarship applications are now open for 2026 session.
                        </p>
                    </div>

                    <div className="announcement-item">
                        <span className="tag urgent">URGENT</span>
                        <p>
                            Last date to submit Post-Matric Scholarship form is 30 April 2026.
                        </p>
                    </div>

                    <div className="announcement-item">
                        <span className="tag update">UPDATE</span>
                        <p>
                            Students must complete OTR before applying for any scholarship.
                        </p>
                    </div>

                    <div className="announcement-item">
                        <span className="tag_info">INFO</span>
                        <p>
                            Scholarship status tracking portal has been activated.
                        </p>
                    </div>

                </div>

            </div>

            {/* FOOTER
            <div className="footer-section">
                <p>© 2026 E-Scholarship Automation System | Digital India Initiative</p>
            </div> */}
        </>
    );
}

export default HomePage;