import React from "react";

function Cards() {

    return (

        <div className="card-container">

            <div className="card">
                <h3>Apply Scholarship</h3>
                <p>Apply online for available government scholarships.</p>
                <button>Apply Now</button>
            </div>

            <div className="card">
                <h3>Track Application</h3>
                <p>Check the status of your scholarship application.</p>
                <button>Track Status</button>
            </div>

            <div className="card">
                <h3>Document Verification</h3>
                <p>Upload and verify required documents.</p>
                <button>Upload Docs</button>
            </div>

            <div className="card">
                <h3>Complaint Portal</h3>
                <p>Raise complaint regarding scholarship issues.</p>
                <button>Raise Complaint</button>
            </div>

            <div className="card">
                <h3>Scholarship Analytics</h3>
                <p>View approved and pending applications.</p>
                <button>View Dashboard</button>
            </div>

            <div className="card">
                <h3>Student Login</h3>
                <p>Login to manage your scholarship profile.</p>
                <button>Login</button>
            </div>

        </div>

    )

}

export default Cards;