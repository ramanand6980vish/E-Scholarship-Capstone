import React from "react";
import { useNavigate } from "react-router-dom";
import "../cssFiles/schemesCards.css";

function SchemeCards() {

    const navigate = useNavigate();

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

    const handleClick = () => {
        navigate("/scholarshipApply");
    };

    return (

        <div className="scheme-page">

            <div className="scheme-header">

                <h1>
                    Scholarship Schemes
                </h1>

                <p>
                    Explore all available scholarship schemes for students
                </p>

            </div>

            {/* PRE MATRIC */}
            <div className="scheme-section">

                <h2 className="section-title">
                    Pre-Matric Schemes
                </h2>

                <div className="scheme-grid">

                    {schemes.pre.map((scheme, index) => (

                        <div
                            className="scheme-card"
                            key={index}
                            onClick={handleClick}
                        >

                            <div className="scheme-icon">
                                🎓
                            </div>

                            <h3>
                                {scheme}
                            </h3>

                            <button className="apply-btn">
                                Apply Now
                            </button>

                        </div>
                    ))}

                </div>

            </div>

            {/* POST MATRIC */}
            <div className="scheme-section">

                <h2 className="section-title">
                    Post-Matric Schemes
                </h2>

                <div className="scheme-grid">

                    {schemes.post.map((scheme, index) => (

                        <div
                            className="scheme-card"
                            key={index}
                            onClick={handleClick}
                        >

                            <div className="scheme-icon">
                                🏆
                            </div>

                            <h3>
                                {scheme}
                            </h3>

                            <button className="apply-btn">
                                Apply Now
                            </button>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default SchemeCards;