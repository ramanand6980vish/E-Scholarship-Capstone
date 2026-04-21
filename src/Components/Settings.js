import React, { useState } from "react";
import "../cssFiles/settings.css";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotify, setEmailNotify] = useState(true);
  const [phoneNotify, setPhoneNotify] = useState(false);
  const [language, setLanguage] = useState("English");

  const saveSettings = () => {
    alert("Settings Saved Successfully ✅");
  };

  return (
    <div className="settings-page">
      <div className="settings-card">

        <div className="settings-header">
          <h1>Account Settings</h1>
          <p>Manage your preferences and privacy controls</p>
        </div>

        {/* Appearance */}
        <div className="setting-box">
          <h3>Appearance</h3>

          <div className="setting-row">
            <span>Dark Mode</span>

            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="setting-box">
          <h3>Notifications</h3>

          <div className="setting-row">
            <span>Email Notifications</span>

            <input
              type="checkbox"
              checked={emailNotify}
              onChange={() =>
                setEmailNotify(!emailNotify)
              }
            />
          </div>

          <div className="setting-row">
            <span>SMS Notifications</span>

            <input
              type="checkbox"
              checked={phoneNotify}
              onChange={() =>
                setPhoneNotify(!phoneNotify)
              }
            />
          </div>
        </div>

        {/* Language */}
        <div className="setting-box">
          <h3>Language</h3>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Bengali</option>
            <option>French</option>
          </select>
        </div>

        {/* Security */}
        <div className="setting-box">
          <h3>Security</h3>

          <button className="danger-btn">
            Change Password
          </button>

          <button className="danger-btn delete">
            Delete Account
          </button>
        </div>

        {/* Save */}
        <button
          className="save-btn"
          onClick={saveSettings}
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}

export default Settings;