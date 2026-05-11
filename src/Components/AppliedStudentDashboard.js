import React, { useEffect, useMemo, useState } from "react";
import "../cssFiles/appliedStudentDashboard.css";

const API_URL = "http://localhost:8080/stateOfficer/getAllApplyData";
const DOCUMENT_FIND_URL = "http://localhost:8080/stateOfficer/findDataByApplicationId";
const DOCUMENT_FETCH_URL = "http://localhost:8080/stateOfficer/getApplyDoc";

const DOCUMENT_LABELS = {
  caste: "Caste Certificate",
  disability: "Disability Certificate",
  ews: "EWS Certificate",
  gap: "Gap Certificate",
  graduation: "Graduation Document",
  income: "Income Certificate",
  photo: "Photo",
  previous: "Previous Marksheet",
  signature: "Signature",
  ten: "10th Marksheet",
  tweleve: "12th Marksheet",
};

const FALLBACK_APPLICATIONS = [
  {
    aadhaar: "111122223333",
    applicationId: "16804158",
    casteCategory: "OBC",
    date: "2026-04-27T11:12:01",
    mobile: "9876543210",
    name: "Rishu Kumar",
    scheme: "scholarship1",
    type: "pre",
    status: "pending",
  },
  {
    aadhaar: "222233334444",
    applicationId: "16804159",
    casteCategory: "SC",
    date: "2026-04-26T16:20:00",
    mobile: "9123456780",
    name: "Anjali Devi",
    scheme: "scholarship2",
    type: "post",
    status: "approved",
  },
];

const formatDate = (value) => {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const maskAadhaar = (value) => {
  const visible = String(value ?? "").slice(-4);
  return `XXXX-XXXX-${visible}`;
};

const initials = (name) => {
  return String(name ?? "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "--";
};

const normalizeRecord = (record) => ({
  aadhaar: String(record.aadhaar ?? ""),
  applicationId: String(record.applicationId ?? ""),
  casteCategory: String(record.casteCategory ?? ""),
  date: String(record.date ?? ""),
  mobile: String(record.mobile ?? ""),
  name: String(record.name ?? ""),
  scheme: String(record.scheme ?? "").trim(),
  type: String(record.type ?? "").trim().toLowerCase(),
  status: String(record.status ?? "pending").trim().toLowerCase(),
});

const getDocumentLabel = (key) => DOCUMENT_LABELS[key] ?? key;

export default function AppliedStudentsDashboard() {
  const [applications, setApplications] = useState(FALLBACK_APPLICATIONS);
  const [selectedApplicationId, setSelectedApplicationId] = useState(
    FALLBACK_APPLICATIONS[0]?.applicationId
  );
  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState([]);
  const [preview, setPreview] = useState(null);

  const selectedApplication = useMemo(() => {
    return applications.find(
      (item) => item.applicationId === selectedApplicationId
    );
  }, [applications, selectedApplicationId]);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchBlob = [
        application.name,
        application.scheme,
        application.aadhaar,
        application.mobile,
        application.applicationId,
        application.casteCategory,
        application.type,
        application.status,
      ]
        .join(" ")
        .toLowerCase();

      return searchBlob.includes(search.toLowerCase());
    });
  }, [applications, search]);

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    if (selectedApplication) {
      loadDocumentManifest(selectedApplication);
    }
  }, [selectedApplication]);

  const loadApplications = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const payload = await response.json();

      const records = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
        ? payload.data
        : [];

      if (records.length) {
        const normalized = records.map(normalizeRecord);
        setApplications(normalized);
        setSelectedApplicationId(normalized[0]?.applicationId);
      }
    } catch (error) {
      console.log("Fallback data used", error);
    }
  };

  const loadDocumentManifest = async (application) => {
    try {
      const response = await fetch(DOCUMENT_FIND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          applicationId: application.applicationId,
        }),
      });

      const payload = await response.json();

      const entries = Object.entries(payload ?? {}).map(([key, value]) => ({
        key,
        label: getDocumentLabel(key),
        dataName: value,
        uploaded: value != null && String(value).trim() !== "",
      }));

      setDocuments(entries);

      const firstUploaded = entries.find((item) => item.uploaded);

      if (firstUploaded) {
        openDocument(application, firstUploaded);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openDocument = async (application, entry) => {
    if (!entry.uploaded) return;

    const formData = new FormData();
    formData.append("appId", application.applicationId);
    formData.append("dataName", entry.dataName);

    try {
      const response = await fetch(DOCUMENT_FETCH_URL, {
        method: "POST",
        body: formData,
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setPreview({
        url,
        type: blob.type,
        name: entry.dataName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const total = applications.length;
  const pending = applications.filter(
    (item) => item.status === "pending"
  ).length;
  const approved = applications.filter(
    (item) => item.status === "approved"
  ).length;

  return (
    <div className="shell">
      <section className="hero">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">
              GovOfficer Applied Student Dashboard
            </span>
            <h1>
              Applied student records ko ek clean, fast, aur readable view
              me dekho.
            </h1>
            <p>
              Ye dashboard scholarship aur application data ko table, status
              badges, aur detail pane ke saath present karta hai.
            </p>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="label">Total Applications</span>
              <span className="value">{total}</span>
            </div>

            <div className="stat">
              <span className="label">Pending Review</span>
              <span className="value">{pending}</span>
            </div>

            <div className="stat">
              <span className="label">Approved</span>
              <span className="value">{approved}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="layout">
        <div className="panel">
          <div className="panel-head">
            <div>
              <h2>Applied Students</h2>
              <p>
                Search by name, scheme, Aadhaar, mobile, or application ID.
              </p>
            </div>

            <div className="toolbar">
              <input
                className="search"
                type="search"
                placeholder="Search student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <span className="pill">
                {filteredApplications.length} records
              </span>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Application ID</th>
                  <th>Scheme</th>
                  <th>Category</th>
                  <th>Aadhaar</th>
                  <th>Mobile</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((application) => (
                  <tr
                    key={application.applicationId}
                    className={
                      application.applicationId === selectedApplicationId
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setSelectedApplicationId(application.applicationId)
                    }
                  >
                    <td>
                      <div className="student-name">
                        {application.name}
                      </div>
                      <div className="subtle">
                        Open documents in a new tab
                      </div>
                    </td>

                    <td>{application.applicationId}</td>
                    <td>{application.scheme}</td>
                    <td>{application.casteCategory}</td>
                    <td>{maskAadhaar(application.aadhaar)}</td>
                    <td>{application.mobile}</td>

                    <td>
                      <span className={`badge ${application.type}`}>
                        {application.type}
                      </span>
                    </td>

                    <td>{formatDate(application.date)}</td>

                    <td>
                      <span className={`badge ${application.status}`}>
                        {application.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="panel">
          <div className="detail">
            <div className="profile-card">
              <div className="avatar">
                {initials(selectedApplication?.name)}
              </div>

              <h3>{selectedApplication?.name}</h3>

              <p>
                Application {selectedApplication?.applicationId} •{" "}
                {selectedApplication?.scheme}
              </p>
            </div>

            <div className="info-grid">
              <div className="info">
                <span className="k">Application ID</span>
                <span className="v">
                  {selectedApplication?.applicationId}
                </span>
              </div>

              <div className="info">
                <span className="k">Aadhaar</span>
                <span className="v">
                  {maskAadhaar(selectedApplication?.aadhaar)}
                </span>
              </div>

              <div className="info">
                <span className="k">Mobile</span>
                <span className="v">{selectedApplication?.mobile}</span>
              </div>

              <div className="info">
                <span className="k">Scheme</span>
                <span className="v">{selectedApplication?.scheme}</span>
              </div>
            </div>

            <div className="document-panel">
              <div className="document-head">
                <div>
                  <h4>Uploaded Documents</h4>
                  <p>Select a student to load files</p>
                </div>

                <span className="pill">
                  {documents.filter((d) => d.uploaded).length} uploaded
                </span>
              </div>

              <div className="document-grid">
                {documents.map((doc) => (
                  <div
                    key={doc.key}
                    className={`doc-card ${!doc.uploaded ? "missing" : ""}`}
                    onClick={() =>
                      openDocument(selectedApplication, doc)
                    }
                  >
                    <div className="doc-top">
                      <div>
                        <div className="doc-name">{doc.label}</div>
                        <div className="doc-file">
                          {doc.uploaded
                            ? doc.dataName
                            : "Not uploaded"}
                        </div>
                      </div>

                      <span
                        className={`doc-status ${
                          doc.uploaded ? "uploaded" : "missing"
                        }`}
                      >
                        {doc.uploaded ? "uploaded" : "null"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="doc-preview">
                {!preview ? (
                  <div className="preview-empty">
                    <strong>No document selected</strong>
                    <p>Uploaded file yahan preview hoga.</p>
                  </div>
                ) : preview.type.includes("image") ? (
                  <img
                    className="preview-media"
                    src={preview.url}
                    alt="preview"
                  />
                ) : (
                  <iframe
                    className="preview-media"
                    src={preview.url}
                    title="document"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
