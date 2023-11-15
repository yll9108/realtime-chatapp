import React, { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch.js";

function Settings() {
    const [showProfile, setShowProfile] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    const toggleSwitches = [
        { label: "Profile", state: showProfile, setState: setShowProfile },
        { label: "Status", state: showStatus, setState: setShowStatus },
        { label: "About", state: showAbout, setState: setShowAbout },
    ];
    return (
        <div>
            <h2>Settings</h2>
            <div>
                {toggleSwitches.map((item, index) => (
                    <div key={index}>
                        <ToggleSwitch
                            label={item.label}
                            checked={item.state}
                            onChange={(value) => item.setState(value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Settings;
