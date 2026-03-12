```javascript
import React, { useState } from "react";

function OTR() {

const [fullName,setFullName] = useState("")
const [email,setEmail] = useState("")
const [mobile,setMobile] = useState("")
const [aadhaar,setAadhaar] = useState("")
const [password,setPassword] = useState("")
const [confirmPassword,setConfirmPassword] = useState("")
const [message,setMessage] = useState("")

const handleSubmit = async (e) => {

e.preventDefault()

if(password !== confirmPassword){
setMessage("Passwords do not match")
return
}

try{

const response = await fetch("http://localhost:8080/otr",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
fullName,
email,
mobile,
aadhaar,
password
})

})

const data = await response.text()

setMessage(data)

setFullName("")
setEmail("")
setMobile("")
setAadhaar("")
setPassword("")
setConfirmPassword("")

}catch(error){

setMessage("Server error")

}

}

return(

<div className="form-container">

<h2>One Time Registration (OTR)</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
placeholder="Full Name"
value={fullName}
onChange={(e)=>setFullName(e.target.value)}
required
/>

<input
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="tel"
placeholder="Mobile Number"
value={mobile}
onChange={(e)=>setMobile(e.target.value)}
required
/>

<input
type="text"
placeholder="Aadhaar Number"
value={aadhaar}
onChange={(e)=>setAadhaar(e.target.value)}
required
/>

<input
type="password"
placeholder="Create Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
required
/>

<button type="submit">Register</button>

</form>

<p>{message}</p>

</div>

)

}

export default OTR
```
