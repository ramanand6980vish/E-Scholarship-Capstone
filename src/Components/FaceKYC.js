// import React, { useRef, useState } from "react";
// import * as faceapi from "face-api.js";
// import "../cssFiles/faceKYC.css";
// import OTR from "./OTR";

// function FaceKYC() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const intervalRef = useRef(null);

//   const [status, setStatus] = useState("Ready to begin");
//   const [started, setStarted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [step, setStep] = useState("LEFT"); // LEFT -> RIGHT -> BLINK -> VERIFIED

//   const centerX = useRef(null);
//   const eyeClosed = useRef(false);

//   // =============================
//   // Load Models
//   // =============================
//   const loadModels = async () => {
//     const MODEL_URL =
//       "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model";

//     await Promise.all([
//       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//       faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
//     ]);
//   };

//   // =============================
//   // Start Camera
//   // =============================
//   const startCamera = async () => {
//     try {
//       setLoading(true);
//       setStatus("Starting camera...");

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//       });

//       videoRef.current.srcObject = stream;
//       await videoRef.current.play();

//       await loadModels();

//       setStarted(true);
//       setStatus("Turn your head LEFT ⬅️");

//       detectFace();
//     } catch (error) {
//       setStatus("Camera permission denied ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =============================
//   // Eye Ratio
//   // =============================
//   const getEAR = (eye) => {
//     const dist = (p1, p2) =>
//       Math.hypot(p1.x - p2.x, p1.y - p2.y);

//     const A = dist(eye[1], eye[5]);
//     const B = dist(eye[2], eye[4]);
//     const C = dist(eye[0], eye[3]);

//     return (A + B) / (2 * C);
//   };

//   // =============================
//   // Capture Photo
//   // =============================
//   const captureImage = () => {
//     const video = videoRef.current;
//     const canvas = document.createElement("canvas");

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0);

//     canvas.toBlob((blob) => {
//       console.log("Captured:", blob);
//     }, "image/jpeg");
//   };

//   // =============================
//   // Detect Face
//   // =============================
//   const detectFace = async () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     const displaySize = {
//       width: video.clientWidth,
//       height: video.clientHeight,
//     };

//     canvas.width = displaySize.width;
//     canvas.height = displaySize.height;

//     faceapi.matchDimensions(canvas, displaySize);

//     intervalRef.current = setInterval(async () => {
//       if (video.readyState !== 4) return;

//       const detection = await faceapi
//         .detectSingleFace(
//           video,
//           new faceapi.TinyFaceDetectorOptions()
//         )
//         .withFaceLandmarks(true);

//       const ctx = canvas.getContext("2d");
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       if (!detection) {
//         setStatus("No face detected ❌");
//         return;
//       }

//       const resized = faceapi.resizeResults(
//         detection,
//         displaySize
//       );

//       faceapi.draw.drawDetections(canvas, resized);
//       faceapi.draw.drawFaceLandmarks(canvas, resized);

//       const landmarks = detection.landmarks;
//       const nose = landmarks.getNose()[3];

//       if (!centerX.current) {
//         centerX.current = nose.x;
//       }

//       // =============================
//       // STEP 1 LEFT
//       // =============================
//       if (step === "LEFT") {
//         if (nose.x < centerX.current - 20) {
//           setStep("RIGHT");
//           setStatus("Turn your head RIGHT ➡️");
//         }
//       }

//       // =============================
//       // STEP 2 RIGHT
//       // =============================
//       else if (step === "RIGHT") {
//         if (nose.x > centerX.current + 20) {
//           setStep("BLINK");
//           setStatus("Blink your eyes 👀");
//         }
//       }

//       // =============================
//       // STEP 3 BLINK
//       // =============================
//       else if (step === "BLINK") {
//         const leftEye = landmarks.getLeftEye();
//         const rightEye = landmarks.getRightEye();

//         const leftEAR = getEAR(leftEye);
//         const rightEAR = getEAR(rightEye);

//         const avgEAR = (leftEAR + rightEAR) / 2;

//         if (avgEAR < 0.22) {
//           eyeClosed.current = true;
//         }

//         if (avgEAR > 0.26 && eyeClosed.current) {
//           setStep("VERIFIED");
//           setStatus("Live Human Verified ✅ Capturing...");
//           captureImage();

//           clearInterval(intervalRef.current);

//           setTimeout(() => {
//             setStatus("Verification Success ✅");
//           }, 1500);
//         }
//       }
//     }, 300);
//   };

//   // =============================
//   // Stop Camera
//   // =============================
//   const stopCamera = () => {
//     clearInterval(intervalRef.current);

//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject
//         .getTracks()
//         .forEach((track) => track.stop());
//     }

//     setStarted(false);
//     setStatus("Camera stopped");
//     setStep("LEFT");
//     centerX.current = null;
//     eyeClosed.current = false;
//   };

//   return (
//     <div className="kyc-wrapper">
//       <h2>Face KYC Verification</h2>

//       <div className="camera-box">
//         {!started && (
//           <p className="placeholder">
//             Click Start Camera
//           </p>
//         )}

//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           playsInline
//         ></video>

//         <canvas ref={canvasRef}></canvas>
//       </div>

//       <p className="status">{status}</p>

//       {/* Props sent correctly */}
//       <OTR status={status} />

//       <div className="btn-group">
//         {!started ? (
//           <button
//             onClick={startCamera}
//             disabled={loading}
//           >
//             {loading ? "Loading..." : "Start Camera"}
//           </button>
//         ) : (
//           <button onClick={stopCamera}>
//             Stop Camera
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default FaceKYC;





import React, { useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "../cssFiles/faceKYC.css";
import OTR from "./OTR";

function FaceKYC() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [status, setStatus] = useState("Ready to begin");
    const [loading, setLoading] = useState(false);
    const [started, setStarted] = useState(false);

    const [aadhaar, setAadhaar] = useState("");

    // credentials
    const [otrId, setOtrId] = useState("");
    const [password, setPassword] = useState("");

    function Status({ status }) {
        return <OTR status={status} />
    }

    let stream = null;

    // Load Models
    const loadModels = async () => {
        const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model";

        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
        ]);
    };

    // Start Camera
    const startCamera = async () => {
        try {
            setLoading(true);
            setStatus("Starting camera...");

            stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            videoRef.current.srcObject = stream;
            await videoRef.current.play();

            await loadModels();

            setStarted(true);
            setStatus("Camera started - detecting face...");
            detectFace();
        } catch (err) {
            setStatus("Camera permission denied");
        } finally {
            setLoading(false);
        }
    };



    const detectFace = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        const displaySize = {
            width: video.clientWidth,
            height: video.clientHeight,
        };

        canvas.width = displaySize.width;
        canvas.height = displaySize.height;

        faceapi.matchDimensions(canvas, displaySize);

        let alreadySent = false;

        const interval = setInterval(async () => {
            if (!video || video.readyState !== 4) return;

            const detections = await faceapi
                .detectAllFaces(
                    video,
                    new faceapi.TinyFaceDetectorOptions({
                        inputSize: 320,
                        scoreThreshold: 0.5,
                    })
                )
                .withFaceLandmarks(true);

            const resized = faceapi.resizeResults(detections, displaySize);

            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            faceapi.draw.drawDetections(canvas, resized);
            faceapi.draw.drawFaceLandmarks(canvas, resized);

            if (detections.length > 0) {
                setStatus("Live Face Verified ✅");



                if (!alreadySent) {
                    alreadySent = true;

                    const imageBlob = await captureImage();
                    await sendToBackend(imageBlob);

                    clearInterval(interval);
                    stopCamera();
                }
            } else {
                setStatus("No face detected ❌");
            }
        }, 200);
    };

    // captureImage
    const captureImage = () => {
        const video = videoRef.current;
        const canvas = document.createElement("canvas");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");

        // mirror fix
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, "image/jpeg", 0.9);
        });
    };

    const sendToBackend = async () => {
        const imageBlob = await captureImage();

        const token = localStorage.getItem("token");
        const aadhaar = localStorage.getItem("aadhaar");

        const formData = new FormData();
        formData.append("image", imageBlob, "face.jpg");
        formData.append("aadhaar", aadhaar);


        try {
            setStatus("Sending to server...");

            const res = await fetch(
                "https://suffering-sabbath-onstage.ngrok-free.dev/otr/eKyc",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.text(); // backend returns text

            // console.log("Frontend response:", formData);
            // console.log()
            // console.log("Server response Rishu:", data);

            if (res.ok) {
                setStatus("Verification Success ✅");

                const credential = await fetch(
                    "https://suffering-sabbath-onstage.ngrok-free.dev/otr/send-otr",
                    {
                        method: "POST",
                    }
                );
                const cred = await credential.json();

                setOtrId(cred.otrId);
                setPassword(cred.password);

                console.log("Received OTR Credential:", cred.otrId, cred.password);

            } else {
                setStatus(data || "Not Verified ❌");
            }

            console.log(data);

        } catch (err) {
            setStatus("Server Error ❌");
            console.error(err);
        }
    };

    // Stop Camera
    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        }
        setStarted(false);
        setStatus("Camera stopped");
    };

    return (
        <div className="kyc-wrapper">
            <h4>Face KYC Verification</h4>

            <div className="camera-box">
                {!started && <p className="placeholder">Click Start Camera</p>}

                <video ref={videoRef} autoPlay muted />
                <canvas ref={canvasRef} />
            </div>

            <p className="status">{status}</p>

            <div className="btn-group">
                {!started ? (
                    <button onClick={startCamera} disabled={loading}>
                        {loading ? "Loading..." : "Start Camera"}
                    </button>
                ) : (
                    <>
                        <button onClick={stopCamera}>Stop Camera</button>
                        <button onClick={sendToBackend}>Verify Face</button>
                    </>

                )}
            </div>
            {/* <OTR status={status} /> */}
        </div>
    );
}

export default FaceKYC;

