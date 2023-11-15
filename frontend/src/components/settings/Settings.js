import React, { useContext, useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch.js";
import { AuthContext } from "../../context/AuthContext.js";

function Settings() {
    const [showProfile, setShowProfile] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    const { user } = useContext(AuthContext);

    const toggleSwitches = [
        { label: "Profile", state: showProfile, setState: setShowProfile },
        { label: "Status", state: showStatus, setState: setShowStatus },
        { label: "About", state: showAbout, setState: setShowAbout },
    ];

    useEffect(() => {
        if (user) {
            // Assuming user object has a userId property
            console.log("User in useEffect:", user);
            // Update state or perform other actions with fetchedUserId
        }
    }, [user]);
    return (
        <div>
            <h2>Settings</h2>
            <div>
                {toggleSwitches.map((item, index) => (
                    <div key={index}>
                        {console.log(
                            "UserId in Settings:",
                            user ? user.userId : null
                        )}
                        <ToggleSwitch
                            label={item.label}
                            checked={item.state}
                            onChange={(value) => item.setState(value)}
                            userId={user ? user._id : null}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Settings;
