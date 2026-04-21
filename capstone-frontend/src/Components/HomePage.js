import React from "react";
import { Link } from "react-router-dom";

function HomePage(){

return(

<div className="home-container">

<h1>Welcome to E-Scholarship Portal</h1>

<div className="main-cards">

<div className="main-card">

<h2>Students</h2>

<p>Apply and manage scholarships</p>

<Link to="/otr">
<button>OTR Registration</button>
</Link>

<Link to="/login">
<button>Student Login</button>
</Link>

</div>

<div className="main-card">

<h2>Officers</h2>

<p>Verify and approve applications</p>

<button>Officer Login</button>

</div>

</div>

</div>

)

}

export default HomePage