import React, { useState } from "react";

function TrackApplication() {

const [appId,setAppId] = useState("")
const [status,setStatus] = useState("")

const handleSubmit = (e) =>{
e.preventDefault()

// Later this will call backend API
// Example: fetch("/track/"+appId)

setStatus("Application Status: Under Verification")
}

return(

<div className="track-container">

<h2>Track Application</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
placeholder="Enter Application ID"
value={appId}
onChange={(e)=>setAppId(e.target.value)}
required
/>

<button type="submit">Track</button>

</form>

{status && <p className="status">{status}</p>}

</div>

)

}

export default TrackApplication