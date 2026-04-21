import React from "react";
import { Link } from "react-router";
import "../cssFiles/footer.css";

function Footer() {

    return (

        <footer className="footer">

            <div className="footer-container">

                <div className="footer-section">
                    <h3>E-Scholarship Portal</h3>
                    <p>
                        A digital platform to manage scholarship applications,
                        verification and tracking for students.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/ScholarshipApply">Apply Scholarship</Link></li>
                        <li><Link to="/track">Track Application</Link></li>
                        <li><Link to="/login">Student Login</Link></li>
                        <li><Link to="/otr">Register</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Important Links</h3>
                    <ul>
                        <li><Link to="/">Guidelines</Link></li>
                        <li><Link to="/">FAQ</Link></li>
                        <li><Link to="/">Scholarship Schemes</Link></li>
                        <li><Link to="/help">Complaint Portal</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>Email: support@escholarship.gov</p>
                    <p>Helpline: 1800-000-000</p>
                    <p>Address: Education Department</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 E-Scholarship Management System | All Rights Reserved</p>
            </div>

        </footer>

    );

}

export default Footer;