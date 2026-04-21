import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [message,setMessage] = useState("");

const navigate = useNavigate();    

const handleSubmit = async (e) => {

e.preventDefault();

try{

const response = await fetch("http://localhost:8080/login",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
email: email,
password: password
})

});

const data = await response.text();

setMessage(data);

if(data === "Login Successfull"){
navigate("/StudentDashboard");
}

}catch(error){

setMessage("Server error. Please try again.");

}

};

return(

<div className="form-container">

<h2>Student Login</h2>

<form onSubmit={handleSubmit}>

<input
type="email"
placeholder="Email or Mobile"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">Login</button>

</form>

<p className="extra-text">
New user? Complete OTR Registration first.
</p>

<p>{message}</p>

</div>

)

}

export default Login;