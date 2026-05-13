import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    useReuploadNotifications
} from "./ReuploadNotifications";

import bellIcon from "../Assets/bell-icon-16.png";

import "../cssFiles/studentNotification.css";

function StudentNotification() {

    // =====================================
    // FETCH NOTIFICATIONS FROM HOOK
    // =====================================

    const {
        notifications: reuploadNotifications,
        loading,
        error,
        refetch
    } = useReuploadNotifications(
        "https://suffering-sabbath-onstage.ngrok-free.dev"
    );

    // =====================================
    // LOCAL CUSTOM NOTIFICATIONS
    // =====================================

    const [
        customNotifications,
        setCustomNotifications
    ] = useState([]);

    // =====================================
    // DROPDOWN STATE
    // =====================================

    const [open, setOpen] =
        useState(false);

    const notifyRef = useRef(null);

    // =====================================
    // RECEIVE REALTIME EVENTS
    // =====================================

    useEffect(() => {

        console.log(
            "StudentNotification Mounted"
        );

        const handleNotification = (
            event
        ) => {

            console.log(
                "NOTIFICATION RECEIVED:",
                event.detail
            );

            const data = event.detail;

            setCustomNotifications(
                (prev) => [
                    {
                        id: Date.now(),

                        title:
                            data.title ||
                            "Notification",

                        message:
                            data.message ||
                            "New Notification",

                        time:
                            data.time ||
                            "Just now",

                        type:
                            data.type || "",
                    },

                    ...prev,
                ]
            );
        };

        window.addEventListener(
            "NEW_NOTIFICATION",
            handleNotification
        );

        return () => {

            window.removeEventListener(
                "NEW_NOTIFICATION",
                handleNotification
            );
        };

    }, []);

    // =====================================
    // FETCH ON BELL CLICK
    // =====================================

    const handleBellClick = async () => {

        console.log(
            "Bell icon clicked"
        );

        // HIT API AGAIN
        await refetch();

        // OPEN/CLOSE DROPDOWN
        setOpen((prev) => !prev);
    };

    // =====================================
    // MERGE ALL NOTIFICATIONS
    // =====================================

    const allNotifications = [
        ...customNotifications,
        ...reuploadNotifications,
    ];

    // =====================================
    // CLOSE ON OUTSIDE CLICK
    // =====================================

    useEffect(() => {

        const handleClickOutside = (
            event
        ) => {

            if (
                open &&
                notifyRef.current &&
                !notifyRef.current.contains(
                    event.target
                )
            ) {

                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, [open]);

    // =====================================
    // HANDLE NOTIFICATION CLICK
    // =====================================

    const handleNotificationClick = (
        item
    ) => {

        console.log(
            "Notification clicked:",
            item
        );

        if (
            item.type === "reupload" ||
            item.type === "rejected"
        ) {

            window.location.href =
                "/reupload";
        }

        setOpen(false);
    };

    return (

        <div
            className="notify-wrapper"
            ref={notifyRef}
        >

            {/* ===================================== */}
            {/* BELL ICON */}
            {/* ===================================== */}

            <div
                className="bell-box"
                onClick={handleBellClick}
            >

                <img
                    src={bellIcon}
                    alt="Notifications"
                    className="bell-img"
                />

                {/* COUNT BADGE */}

                {allNotifications.length > 0 && (

                    <span className="notify-count">

                        {allNotifications.length > 99
                            ? "99+"
                            : allNotifications.length}

                    </span>
                )}

            </div>

            {/* ===================================== */}
            {/* DROPDOWN PANEL */}
            {/* ===================================== */}

            {open && (

                <div className="notify-panel">

                    {/* HEADER */}

                    <div className="notify-header">

                        <h3>
                            Notifications
                        </h3>

                        <button
                            className="close-btn"
                            onClick={() =>
                                setOpen(false)
                            }
                        >
                            ✕
                        </button>

                    </div>

                    {/* LOADING */}

                    {loading && (

                        <p className="empty-text">
                            Loading...
                        </p>
                    )}

                    {/* ERROR */}

                    {error && (

                        <p className="empty-text">
                            {error}
                        </p>
                    )}

                    {/* EMPTY */}

                    {!loading &&
                        allNotifications.length === 0 && (

                            <p className="empty-text">
                                No notifications available
                            </p>
                        )}

                    {/* LIST */}

                    <div className="notify-list">

                        {allNotifications.map(
                            (item, index) => (

                                <div
                                    key={
                                        item.id ||
                                        index
                                    }

                                    className={`notify-card ${item.type || ""
                                        }`}

                                    onClick={() =>
                                        handleNotificationClick(
                                            item
                                        )
                                    }

                                    style={{

                                        cursor:
                                            item.type
                                                ? "pointer"
                                                : "default",

                                        borderLeft:
                                            item.type === "reupload"
                                                ? "4px solid orange"
                                                : item.type === "rejected"
                                                    ? "4px solid red"
                                                    : "none",
                                    }}
                                >

                                    <h4>
                                        {item.title}
                                    </h4>

                                    <p>
                                        {item.message}
                                    </p>

                                    <small>
                                        {item.time}
                                    </small>

                                    {/* REUPLOAD BUTTON */}

                                    {(item.type === "reupload" ||
                                        item.type === "rejected") && (

                                            <div
                                                style={{
                                                    marginTop: "10px",
                                                }}
                                            >

                                                <button
                                                    style={{

                                                        background:
                                                            item.type === "reupload"
                                                                ? "#ff9800"
                                                                : "#f44336",

                                                        color: "white",

                                                        border: "none",

                                                        padding: "6px 12px",

                                                        borderRadius: "4px",

                                                        cursor: "pointer",

                                                        fontSize: "12px",
                                                    }}

                                                    onClick={(e) => {

                                                        e.stopPropagation();

                                                        window.location.href =
                                                            "/reupload";
                                                    }}
                                                >

                                                    Reupload Document

                                                </button>

                                            </div>
                                        )}

                                </div>
                            )
                        )}

                    </div>

                </div>
            )}

        </div>
    );
}

export default StudentNotification;