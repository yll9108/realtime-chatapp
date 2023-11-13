import React from "react";
import ToggleSwitch from "./ToggleSwitch.js";

function Settings() {
    const toggleSwitches = [
        { label: "Profile" },
        { label: "Status" },
        { label: "About" },
    ];
    return (
        <div>
            <h2>Settings</h2>
            <div>
                {toggleSwitches.map((item, index) => (
                    <div key={index}>
                        <ToggleSwitch label={item.label} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Settings;
