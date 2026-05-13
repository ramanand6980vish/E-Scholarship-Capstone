import React, { useState } from "react";
import "../cssFiles/trackApplication.css";

function TrackApplication() {
    const [aadhaar, setAadhaar] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setData([]);

        try {
            // STEP 1: Get all applications using Aadhaar
            const res1 = await fetch(
                `http://localhost:8080/getApplicationsByAadhaar?aadhaar=${aadhaar}`
            );

            if (!res1.ok) throw new Error("Aadhaar not found");

            const applications = await res1.json();

            // STEP 2: Extract all applicationIds
            const appIds = applications.map(app => app.applicationId);

            if (appIds.length === 0) {
                throw new Error("No applications found");
            }

            // STEP 3: Fetch status for each applicationId
            const results = await Promise.all(
                appIds.map(async (id) => {
                    const res = await fetch(
                        `http://localhost:8080/statusByAppId?appid=${id}`
                    );

                    if (!res.ok) {
                        return {
                            applicationId: id,
                            error: "Failed to fetch status"
                        };
                    }

                    const statusData = await res.json();

                    return {
                        applicationId: id,
                        ...statusData
                    };
                })
            );

            setData(results);

        } catch (err) {
            setError("Failed to fetch application details");
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status) => {
        if (!status) return "status-null";
        if (status.toLowerCase() === "verified") return "status-verified";
        if (status.toLowerCase() === "reupload") return "status-reupload";
        return "status-pending";
    };

    return (
        <div className="track-container">

            <h2>Track Your Application</h2>

            <form onSubmit={handleSubmit} className="track-form">

                <input
                    type="text"
                    placeholder="Enter Aadhaar Number"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value)}
                    required
                />

                <button type="submit">
                    {loading ? "Tracking..." : "Track"}
                </button>

            </form>

            {error && <p className="error">{error}</p>}

            {/* RESULT SECTION */}
            {data && data.length > 0 && (
                <div className="result-wrapper">

                    {data.map((item, index) => (
                        <div className="result-card" key={index}>

                            <h3>Application ID: {item.applicationId}</h3>

                            {item.error ? (
                                <p className="error">{item.error}</p>
                            ) : (
                                <div className="grid">

                                    <div className={`status-box ${getStatusClass(item.photoStatus)}`}>
                                        Photo: {item.photoStatus || "NULL"}
                                    </div>

                                    <div className={`status-box ${getStatusClass(item.signatureStatus)}`}>
                                        Signature: {item.signatureStatus || "NULL"}
                                    </div>

                                    <div className={`status-box ${getStatusClass(item.incomeCertificateStatus)}`}>
                                        Income: {item.incomeCertificateStatus || "NULL"}
                                    </div>

                                    <div className={`status-box ${getStatusClass(item.casteCertificateStatus)}`}>
                                        Caste: {item.casteCertificateStatus || "NULL"}
                                    </div>

                                    <div className={`status-box ${getStatusClass(item.tenMarksheetStatus)}`}>
                                        10th: {item.tenMarksheetStatus || "NULL"}
                                    </div>

                                    <div className={`status-box ${getStatusClass(item.twelveMarksheetStatus)}`}>
                                        12th: {item.twelveMarksheetStatus || "NULL"}
                                    </div>

                                    <div className={`status-box ${getStatusClass(item.aadhaarCardStatus)}`}>
                                        Aadhaar: {item.aadhaarCardStatus || "NULL"}
                                    </div>

                                </div>
                            )}

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default TrackApplication;