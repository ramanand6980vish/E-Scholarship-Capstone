import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../cssFiles/studentView4Officer.css";

function StudentView4Officer() {

    const navigate = useNavigate();

    const [student, setStudent] = useState(null);

    const [documents, setDocuments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState("Pending ⏳");

    const BASE_URL =
        "https://suffering-sabbath-onstage.ngrok-free.dev";

    // document names
    const documentList = [

        {
            key: "income",
            label: "Income Certificate"
        },

        {
            key: "caste",
            label: "Caste Certificate"
        },

        {
            key: "photo",
            label: "Photo"
        },

        {
            key: "signature",
            label: "Signature"
        },

        {
            key: "ten",
            label: "10th Certificate"
        },

        {
            key: "tweleve",
            label: "12th Certificate"
        },

        {
            key: "graduation",
            label: "Graduation Certificate"
        },

        {
            key: "gap",
            label: "Gap Certificate"
        },

        {
            key: "ews",
            label: "EWS Certificate"
        },

        {
            key: "disability",
            label: "Disability Certificate"
        },

        {
            key: "previous",
            label: "Previous Marksheet"
        }

    ];

    useEffect(() => {

        fetchAllDocuments();

    }, []);

    // fetch actual document
    const fetchDocument = async (
        endpoint,
        appId,
        dataName
    ) => {

        try {

            const formData = new FormData();

            formData.append(
                "appId",
                appId
            );

            formData.append(
                "dataName",
                dataName
            );

            const response = await fetch(
                `${BASE_URL}${endpoint}`,
                {
                    method: "POST",

                    headers: {
                        "ngrok-skip-browser-warning":
                            "true"
                    },

                    body: formData
                }
            );

            if (!response.ok) {

                return null;
            }

            const blob =
                await response.blob();

            if (blob.size === 0) {

                return null;
            }

            return URL.createObjectURL(blob);

        } catch (error) {

            console.error(
                `${dataName} error`,
                error
            );

            return null;
        }
    };

    // main fetch
    const fetchAllDocuments = async () => {

        try {

            const storedStudent = JSON.parse(
                localStorage.getItem(
                    "selectedStudent"
                )
            );

            if (!storedStudent) {

                alert(
                    "No Student Selected"
                );

                navigate(
                    "/officer-dashboard"
                );

                return;
            }

            setStudent(
                storedStudent
            );

            const appId =
                storedStudent.applicationId;

            // IMPORTANT FIX
            // correct parameter = appId
            const response =
                await fetch(
                    `${BASE_URL}/stateOfficer/findDataByApplicationId?appId=${appId}`,
                    {
                        method: "POST",

                        headers: {
                            "ngrok-skip-browser-warning":
                                "true"
                        }
                    }
                );

            const data =
                await response.json();

            console.log(
                "DOCUMENT DATA:",
                data
            );

            let tempDocs = [];

            // loop all docs
            for (const doc of documentList) {

                const key =
                    doc.key;

                // if null skip
                if (
                    data[key] === null ||
                    data[key] === undefined ||
                    data[key] === ""
                ) {

                    continue;
                }

                // govt document
                const govtDoc =
                    await fetchDocument(
                        "/stateOfficer/findGovDoc",
                        appId,
                        key
                    );

                // uploaded document
                const uploadedDoc =
                    await fetchDocument(
                        "/stateOfficer/findApplyDoc",
                        appId,
                        key
                    );

                if (!govtDoc && !uploadedDoc) {
                    continue;
                }

                tempDocs.push({

                    name:
                        doc.label,

                    govtDoc,

                    uploadedDoc

                });
            }

            console.log(
                "FINAL DOCS:",
                tempDocs
            );

            setDocuments(
                tempDocs
            );

        } catch (error) {

            console.error(
                "MAIN ERROR:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    // open document
    const openDocument = (
        url
    ) => {

        if (!url) {

            alert(
                "Document Not Available"
            );

            return;
        }

        window.open(
            url,
            "_blank"
        );
    };

    // approve
    const approveStudent = () => {

        setStatus(
            "Approved ✅"
        );

    };

    // reject
    const rejectStudent = () => {

        setStatus(
            "Rejected ❌"
        );

    };

    if (loading) {

        return (

            <div className="student-view-container">

                <h2>
                    Loading...
                </h2>

            </div>
        );
    }

    return (

        <div className="student-view-container">

            {/* top */}
            <div className="top-bar">

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate(-1)
                    }
                >
                    ⬅ Back
                </button>

                <h2>
                    📄 Student Verification
                </h2>

            </div>

            {/* student details */}
            <div className="student-card">

                <h3>
                    👨 Student Details
                </h3>

                <p>
                    <strong>
                        Name:
                    </strong>
                    {" "}
                    {student?.name}
                </p>

                <p>
                    <strong>
                        Aadhaar:
                    </strong>
                    {" "}
                    {student?.aadhaar}
                </p>

                <p>
                    <strong>
                        Application ID:
                    </strong>
                    {" "}
                    {
                        student?.applicationId
                    }
                </p>

                <p>
                    <strong>
                        Category:
                    </strong>
                    {" "}
                    {
                        student?.casteCategory
                    }
                </p>

                <p>
                    <strong>
                        Mobile:
                    </strong>
                    {" "}
                    {student?.mobile}
                </p>

                <p>
                    <strong>
                        Scheme:
                    </strong>
                    {" "}
                    {student?.scheme}
                </p>

                <p>
                    <strong>
                        Type:
                    </strong>
                    {" "}
                    {student?.type}
                </p>

                <hr />

                <h3>
                    📑 Documents Verification
                </h3>

                <table className="document-table">

                    <thead>

                        <tr>

                            <th>
                                Document Name
                            </th>

                            <th>
                                Government Database
                            </th>

                            <th>
                                Uploaded Document
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {documents.length >
                            0 ? (

                            documents.map(
                                (
                                    doc,
                                    index
                                ) => (

                                    <tr
                                        key={
                                            index
                                        }
                                    >

                                        <td>
                                            {
                                                doc.name
                                            }
                                        </td>

                                        <td>

                                            {doc.govtDoc && (

                                                <button
                                                    className="view-btn"
                                                    onClick={() =>
                                                        openDocument(
                                                            doc.govtDoc
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>

                                            )}

                                        </td>

                                        <td>

                                            {doc.uploadedDoc && (

                                                <button
                                                    className="view-btn"
                                                    onClick={() =>
                                                        openDocument(
                                                            doc.uploadedDoc
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>

                                            )}

                                        </td>

                                    </tr>

                                )
                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan="3"
                                >
                                    No Documents
                                    Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

                {/* buttons */}
                <div className="action-btns">

                    <button
                        className="approve-btn"
                        onClick={
                            approveStudent
                        }
                    >
                        ✅ Approve
                    </button>

                    <button
                        className="reject-btn"
                        onClick={
                            rejectStudent
                        }
                    >
                        ❌ Reject
                    </button>

                </div>

                {/* status */}
                <div className="status-box">

                    <h3>
                        Current Status:
                        {" "}
                        {status}
                    </h3>

                </div>

            </div>

        </div>
    );
}

export default StudentView4Officer;