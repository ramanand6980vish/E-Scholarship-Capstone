import React from "react";
import { Link } from "react-router-dom";

function StudentDashboard(){

return(

<div className="dashboard-container">

<h2>Student Dashboard</h2>

<div className="dashboard-cards">

<div className="dash-card">
<h3>Apply Scholarship</h3>
<p>Submit a new scholarship application.</p>
<Link to="/apply">
<button>Apply Now</button>
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
<h3>Upload Documents</h3>
<p>Upload or update required documents.</p>
<button>Upload</button>
</div>

<div className="dash-card">
<h3>Profile</h3>
<p>View and update your profile.</p>
<button>View Profile</button>
</div>

<div className="dash-card">
<h3>Complaint Portal</h3>
<p>Raise issues regarding scholarship.</p>
<Link to="/helpdesk">
<button>Submit Complaint</button>
</Link>
</div>

</div>

</div>

)

}

export default StudentDashboard