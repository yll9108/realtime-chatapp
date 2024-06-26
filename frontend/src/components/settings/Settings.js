import React, { useContext, useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch.js";
import { AuthContext } from "../../context/AuthContext.js";
import axios from "axios";
import AccountSettings from "./AccountSettings.js";
import { Container, Button, Stack } from "react-bootstrap";

function Settings() {
    const { user } = useContext(AuthContext);
    const userId = user._id;
    const [showProfile, setShowProfile] = useState();
    const [showStatus, setShowStatus] = useState();
    const [showAbout, setShowAbout] = useState();
    const [showAccountSettings, setShowAccountSettings] = useState(false);

    useEffect(() => {
        axios
            .get(
                `https://realtime-chatapp-backend-nc9x.onrender.com/api/settings/${userId}`
            )
            .then((res) => {
                setShowProfile(res.data.showProfile);
                setShowStatus(res.data.showStatus);
                setShowAbout(res.data.showAbout);
            })
            .catch((err) => {
                console.log("Settings error -", err);
            });
    }, [userId]);

    return (
        <Container>
            <Stack
                direction="vertically"
                gap={2}
                className="single-user align-items-center"
                style={{ textAlign: "center" }}
            >
                <h2>Settings</h2>
                {showAccountSettings ? (
                    <AccountSettings
                        setShowAccountSettings={setShowAccountSettings}
                    />
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
                        <Button
                            variant="primary"
                            onClick={() => setShowAccountSettings(true)}
                        >
                            Account Settings
                        </Button>
                    </>
                )}
            </Stack>
        </Container>
    );
}

export default Settings;
