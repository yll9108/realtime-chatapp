import React, { useContext, useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch.js";
import { AuthContext } from "../../context/AuthContext.js";
import axios from "axios";

function Settings() {
    const { user } = useContext(AuthContext);
    const userId = user._id;
    const [showProfile, setShowProfile] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    // const toggleSwitches = [
    //     { label: "Profile", state: showProfile, setState: setShowProfile },
    //     { label: "Status", state: showStatus, setState: setShowStatus },
    //     { label: "About", state: showAbout, setState: setShowAbout },
    // ];

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/settings/${userId}`)
            .then((res) => {
                setShowProfile(res.data.showProfile);
                setShowStatus(res.data.showStatus);
                setShowAbout(res.data.showAbout);
                console.log("!!!!!!res", res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userId]);

    return (
        <div>
            <h2>Settings</h2>
            <div>
                <ToggleSwitch
                    label="Profile"
                    userId={user ? user._id : null}
                    status={showProfile}
                />
                <ToggleSwitch
                    label="Status"
                    userId={user ? user._id : null}
                    status={showStatus}
                />
                <ToggleSwitch
                    label="About"
                    userId={user ? user._id : null}
                    status={showAbout}
                />
            </div>
        </div>
    );
}

export default Settings;
