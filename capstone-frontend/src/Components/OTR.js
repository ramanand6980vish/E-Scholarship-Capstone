import React from "react";

function OTR(){

return(

<div className="form-container">

<h2>One Time Registration (OTR)</h2>

<form>

<input type="text" placeholder="Full Name" required />

<input type="email" placeholder="Email Address" required />

<input type="tel" placeholder="Mobile Number" required />

<input type="text" placeholder="Aadhaar Number" required />

<input type="password" placeholder="Create Password" required />

<input type="password" placeholder="Confirm Password" required />

<button type="submit">Register</button>

</form>

</div>

)

}

export default OTR