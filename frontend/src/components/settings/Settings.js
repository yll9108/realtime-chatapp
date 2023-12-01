import React, { useContext, useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch.js";
import { AuthContext } from "../../context/AuthContext.js";
import axios from "axios";
import AccountSettings from "./AccountSettings.js";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

function Settings() {
    const { user } = useContext(AuthContext);
    const userId = user._id;
    const [showProfile, setShowProfile] = useState();
    const [showStatus, setShowStatus] = useState();
    const [showAbout, setShowAbout] = useState();
    const [showAccountSettings, setShowAccountSettings] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/settings/${userId}`)
            .then((res) => {
                setShowProfile(res.data.showProfile);
                setShowStatus(res.data.showStatus);
                setShowAbout(res.data.showAbout);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userId]);

    return (
        <div>
            <h2>Settings</h2>
            {showAccountSettings ? (
                <AccountSettings setShowAccountSettings={setShowAccountSettings} />
            ) : (
                <>
                    <ToggleSwitch
                        label="Profile"
                        userId={userId}
                        status={showProfile}
                        setStatus={setShowProfile}
                    />
                    <ToggleSwitch
                        label="Status"
                        userId={userId}
                        status={showStatus}
                        setStatus={setShowStatus}
                    />
                    <ToggleSwitch
                        label="About"
                        userId={userId}
                        status={showAbout}
                        setStatus={setShowAbout}
                    />
                    <Button variant="primary" onClick={() => setShowAccountSettings(true)}>
                        Account Settings
                    </Button>
                </>
            )}
        </div>
    );
}

export default Settings;
