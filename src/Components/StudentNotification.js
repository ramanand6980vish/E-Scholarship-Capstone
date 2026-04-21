import React, { useState, useEffect, useRef } from "react";
import bellIcon from "../Assets/bell-icon-16.png";
import "../cssFiles/studentNotification.css";

function StudentNotification() {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    const token = localStorage.getItem("token");
    const notifyRef = useRef(null);

    // =========================
    // Fetch Notifications
    // =========================
    const fetchNotifications = async () => {
        try {
            const res = await fetch(
                "https://your-backend-url.ngrok-free.app/student/notifications",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            setNotifications(data);
        } catch (error) {
            console.log("Notification Error:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

  
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                open &&
                notifyRef.current &&
                !notifyRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener(
                "mousedown",
                handleOutsideClick
            );
        }

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, [open]);

    return (
        <div
            className="notify-wrapper"
            ref={notifyRef}
        >
            {/* Bell Icon */}
            <div
                className="bell-box"
                onClick={() => setOpen(!open)}
            >
                <img
                    src={bellIcon}
                    alt="Notifications"
                    className="bell-img"
                />

                {/* Count */}
                {notifications.length > 0 && (
                    <span className="notify-count">
                        {notifications.length > 99
                            ? "99+"
                            : notifications.length}
                    </span>
                )}
            </div>

            {/* Dropdown */}
            {open && (
                <div className="notify-panel">
                    <div className="notify-header">
                        <h3>Notifications</h3>

                        <button
                            className="close-btn"
                            onClick={() => setOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    {notifications.length === 0 ? (
                        <p className="empty-text">
                            No notifications available
                        </p>
                    ) : (
                        notifications.map((item, index) => (
                            <div
                                className="notify-card"
                                key={index}
                            >
                                <h4>{item.title}</h4>
                                <p>{item.message}</p>
                                <small>{item.time}</small>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default StudentNotification;