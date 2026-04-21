import React, { useState } from "react";
import "../cssFiles/ScholarshipApply.css";
// import React from "react";
import "../cssFiles/setLoader.css";

function ScholarshipApply() {

  const [type, setType] = useState("");
  const [casteCategory, setCasteCategory] = useState("");
  const [currentClass, setCurrentClass] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [schemeType, setSchemeType] = useState("");

  const [ews, setEws] = useState(false);
  const [disability, setDisability] = useState(false);
  const [gap, setGap] = useState(false);

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");


  const [agree, setAgree] = useState(false);

  const [extraFiles, setExtraFiles] = useState({
    photoPath: null,
    signature: null,
    incomeCertificate: null,
    casteCertificate: null,
    aadhaarCard: null,
    previousMarksheet: null
  });

  const schemes = {
    pre: [
      "Pre-Matric SC",
      "Pre-Matric ST",
      "Pre-Matric OBC",
      "Pre-Matric Minority",
      "Pre-Matric EWS",
      "Pre-Matric Manual Scavenger",
      "Pre-Matric Disability"
    ],
    post: [
      "Post-Matric SC",
      "Post-Matric ST",
      "Post-Matric OBC",
      "Post-Matric Minority",
      "Post-Matric EWS",
      "Post-Matric Disability",
      "Merit-cum-Means",
      "Central Sector Scholarship"
    ]
  };

  const [files, setFiles] = useState({});
  const [bankData, setBankData] = useState({
    bankAccountNumber: "",
    ifscCode: ""
  });

  const categories = ["SC", "ST", "OBC", "General", "Minority"];

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleBankChange = (e) => {
    setBankData({
      ...bankData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      alert("Please accept terms & conditions");
      return;
    }

    const formData = new FormData();

    formData.append("type", type);
    formData.append("casteCategory", casteCategory);
    formData.append("currentClass", currentClass);
    formData.append("mobileNumber", mobileNumber);


    formData.append("ews", ews);
    formData.append("disability", disability);
    formData.append("gap", gap);

    formData.append("bankAccountNumber", bankData.bankAccountNumber);
    formData.append("ifscCode", bankData.ifscCode);
    formData.append("schemeType", schemeType);


    Object.keys(files).forEach((key) => {
      formData.append(key, files[key]);
    });

    setLoading(true);


    try {
      // ✅ API CALL
      const response = await fetch("https://suffering-sabbath-onstage.ngrok-free.dev/api/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.trim()}`
        },
        body: formData,
      });

      const data = await response.text();

      if (response.ok) {
        alert("Application submitted successfully ✅");
        console.log(data);
      } else {
        alert("Submission failed ❌");
        console.error(data);
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }


    console.log("FORM DATA READY:", formData);
  };

  const RequiredLabel = ({ text }) => (
    <label>
      {text} <span style={{ color: "red" }}>*</span>
    </label>
  );

  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <h2>Please wait...</h2>
        </div>
      )}
      <div className="scholarship-container">

        {/* HERO CARDS */}
        {!type && (
          <>
            <div className="card-wrapper">

              <div className="card" onClick={() => setType("pre")}>
                <h3>🎓 Pre-Matric</h3>
                <p>Class 1 - 10 Students</p>
              </div>

              <div className="card" onClick={() => setType("post")}>
                <h3>🎓 Post-Matric</h3>
                <p>Class 11 - Higher Education</p>
              </div>

            </div>
          </>
        )}

        {/* FORM */}
        {type && (
          <>
            <form className="form-card" onSubmit={handleSubmit}>

              <h2 className="title">
                {type === "pre" ? "Pre-Matric Scholarship" : "Post-Matric Scholarship"}
              </h2>
              {/* ------------------------------------------------------------------ */}

              {!schemeType && (
                <div className="scheme-wrapper">
                  <h2>Select Scholarship Scheme</h2>

                  <div className="scheme-grid">
                    {schemes[type].map((scheme, index) => (
                      <div
                        key={index}
                        className="scheme-card"
                        onClick={() => setSchemeType(scheme)}
                      >
                        <h3>{scheme}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------ */}

              {schemeType && (
                <>
                  <h2 className="title">
                    {schemeType}
                  </h2>


                  <div className="row">
                    <div className="field">
                      <RequiredLabel text="Current Class" />
                      <select onChange={(e) => setCurrentClass(e.target.value)} required>
                        <option value="">Select</option>
                        <option value="10">10th</option>
                        <option value="12">12th</option>
                        <option value="grad">Under Graduation</option>
                        <option value="pg">Post Graduation</option>
                      </select>
                    </div>

                    <div className="field">
                      <RequiredLabel text="Caste Category" />
                      <select onChange={(e) => setCasteCategory(e.target.value)} required>
                        <option value="">Select</option>
                        {categories.map((c, i) => (
                          <option key={i} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>




                  {/* Row3 */}
                  <div className="row">
                    <div className="field">
                      <RequiredLabel text="Income Certificate" />
                      <input type="file" name="incomeCertificate" onChange={handleFileChange} />
                    </div>

                    <div className="field">
                      <RequiredLabel text="Caste Certificate" />
                      <input type="file" name="casteCertificate" onChange={handleFileChange} />
                    </div>
                  </div>

                  {/* ROW 4 */}
                  <div className="row">
                    <div className="field">
                      <RequiredLabel text="Bank Account" />
                      <input
                        type="text"
                        name="bankAccountNumber"
                        placeholder="Account Number"
                        onChange={handleBankChange}
                        required
                      />
                    </div>

                    <div className="field">
                      <RequiredLabel text="IFSC Code" />
                      <input
                        type="text"
                        name="ifscCode"
                        placeholder="IFSC Code"
                        onChange={handleBankChange}
                        required
                      />
                    </div>
                  </div>

                  {/* FILE SECTION */}
                  <div className="file-box">
                    <h3>Special Category Documents</h3>
                    <p style={{ fontSize: "13px" }} >Upload documents only if applicable to your category (EWS, Disability, or Gap).
                      Ensure all certificates are valid, clearly visible, and issued by an authorized authority.</p>

                    {(currentClass === "12" || currentClass === "grad" || currentClass === "pg") && (
                      <div>
                        <RequiredLabel text="10th Marksheet" />
                        <input type="file" name="tenMarksheet" onChange={handleFileChange} />
                      </div>
                    )}

                    {(currentClass === "grad" || currentClass === "pg") && (
                      <div>
                        <RequiredLabel text="12th Marksheet" />
                        <input type="file" name="twelveMarksheet" onChange={handleFileChange} />
                      </div>
                    )}

                    {currentClass === "pg" && (
                      <div>
                        <RequiredLabel text="Graduation Marksheet" />
                        <input type="file" name="graduationMarksheet" onChange={handleFileChange} />
                      </div>
                    )}
                  </div>

                  {/* EXTRA OPTIONS */}
                  <div className="checkbox-box">

                    <div>
                      <input type="checkbox" onChange={() => setEws(!ews)} />
                      {ews ? <RequiredLabel text="EWS Certificate" /> : <label>EWS Certificate</label>}
                      {ews && <input type="file" name="ewsCertificate" onChange={handleFileChange} />}
                    </div>

                    <div>
                      <input type="checkbox" onChange={() => setDisability(!disability)} />
                      {disability ? <RequiredLabel text="Disability Certificate" /> : <label>Disability Certificate</label>}
                      {disability && <input type="file" name="disabilityCertificate" onChange={handleFileChange} />}
                    </div>

                    <div>
                      <input type="checkbox" onChange={() => setGap(!gap)} />
                      {gap ? <RequiredLabel text="Gap Certificate" /> : <label>Gap Certificate</label>}
                      {gap && <input type="file" name="gapCertificate" onChange={handleFileChange} />}
                    </div>

                  </div>

                  <div className="row">
                    <div className="field">
                      <RequiredLabel text="Photo" />
                      <input type="file" name="photoPath" onChange={handleFileChange} required />
                    </div>
                    <div className="field">
                      <RequiredLabel text="Signature" />
                      <input type="file" name="signature" onChange={handleFileChange} required />
                    </div>


                  </div>



                  {/* TERMS */}
                  <div style={{
                    border: "1px solid #ccc",
                    padding: "15px",
                    borderRadius: "8px",
                    maxHeight: "200px",
                    overflowY: "auto"
                  }}>
                    <h3>Scholarship Application Declaration & Consent</h3>
                    <ul style={{ fontSize: "13px" }} >
                      <li>All information provided is true and accurate.</li>
                      <li>All documents uploaded are genuine.</li>
                      <li>False info may lead to rejection.</li>
                      <li>I allow verification from authorities.</li>
                      <li>I consent to use my data for processing.</li>
                      <li>Data will be handled as per privacy policy.</li>
                      <li>Authority decision will be final.</li>
                    </ul>
                  </div>

                  {/* <br /> */}

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={() => setAgree(!agree)}
                    />
                    <label style={{ marginLeft: "8px" }}>
                      I agree to the terms and confirm details are correct
                    </label>
                  </div>

                  <br />

                  <button
                    className={`submit-btn ${!agree ? "disabled" : ""}`}
                    type="submit"
                    disabled={!agree}
                  >
                    Submit Application
                  </button>
                </>
              )}
            </form>
          </>
        )}

      </div>
    </>
  )
}

export default ScholarshipApply;