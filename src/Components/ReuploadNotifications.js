import React, { useEffect, useState } from "react";

/**
 * Custom hook to fetch reupload/rejected documents
 * @param {string} apiBaseUrl - Your backend API base URL
 * @returns {Object} - { notifications, loading, error }
 */
export const useReuploadNotifications = (apiBaseUrl = "https://suffering-sabbath-onstage.ngrok-free.dev") => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReuploadDocuments = React.useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            const aadhar = localStorage.getItem("aadhaarNumber");

            if (!aadhar) {
                setError("Auth credentials not found");
                setLoading(false);
                return;
            }

            const response = await fetch(
                console.log("Fetching reupload for Aadhaar:", aadhar) ||
                `${apiBaseUrl}/statusByAadhaar?aadhaar=${encodeURIComponent(aadhar)}`,
               
            );

            console.log("Reupload API Response Status:", response.status);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const apps = await response.json();
            const applicationsArray = Array.isArray(apps) ? apps : [apps];

            const documentLabels = {
                photoStatus: "Photo",
                signatureStatus: "Signature",
                aadhaarCardStatus: "Aadhaar Card",
                tenMarksheetStatus: "10th Marksheet",
                twelveMarksheetStatus: "12th Marksheet",
                graduationMarksheetStatus: "Graduation Marksheet",
                previousMarksheetStatus: "Previous Marksheet",
                incomeCertificateStatus: "Income Certificate",
                casteCertificateStatus: "Caste Certificate",
                ewsCertificateStatus: "EWS Certificate",
                disabilityCertificateStatus: "Disability Certificate",
                gapCertificateStatus: "Gap Certificate"
            };

            let reuploadNotifications = [];

            applicationsArray.forEach(app => {
                if (!app || !app.applicationId) return;

                Object.keys(documentLabels).forEach(statusKey => {
                    const status = app[statusKey];
                    if (status === "REUPLOAD" || status === "REJECTED") {
                        reuploadNotifications.push({
                            id: `${app.applicationId}-${statusKey}`,
                            title: documentLabels[statusKey],
                            message: `Application #${app.applicationId} - Status: ${status}`,
                            appId: app.applicationId,
                            docField: statusKey,
                            status: status,
                            time: "Pending",
                            type: status === "REUPLOAD" ? "reupload" : "rejected"
                        });
                    }
                });
            });

            setNotifications(reuploadNotifications);
        } catch (err) {
            console.error("Error fetching reupload notifications:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // useEffect(() => {
    //     fetchReuploadDocuments();

    //     // Refresh every 30 seconds
    //     const interval = setInterval(fetchReuploadDocuments, 30000);

    //     return () => clearInterval(interval);
    // }, []);


    useEffect(() => {
    fetchReuploadDocuments();
}, []);

    return { notifications, loading, error, refetch: fetchReuploadDocuments };
};

export default useReuploadNotifications;