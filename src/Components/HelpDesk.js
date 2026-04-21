import React, { useState } from "react";

function HelpDesk() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [response, setResponse] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        // Later connect to backend

        setResponse("Your complaint has been submitted successfully.")

        setName("")
        setEmail("")
        setMessage("")
    }

    return (

        <div className="helpdesk-container">

            <h2>Help Desk / Complaint Portal</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Describe your issue"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <button type="submit">Submit Complaint</button>

            </form>

            {response && <p className="success">{response}</p>}

        </div>

    )

}

export default HelpDesk