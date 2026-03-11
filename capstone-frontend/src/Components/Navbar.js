import React from "react";
import { Link } from "react-router-dom";

function Navbar(){

return(

<nav className="navbar">

<div className="logo">
E-Scholarship Portal
</div>

<ul className="nav-links">

<li><Link to="/">Home</Link></li>
<li><Link to="/otr">OTR Registration</Link></li>
<li><Link to="/login">Student Login</Link></li>
<li><Link to="/track">Track Application</Link> </li>
<li> <Link to="/help">Help Desk</Link></li>

</ul>

</nav>

)

}

export default Navbar