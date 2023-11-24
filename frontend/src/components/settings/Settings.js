import React, { useContext, useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch.js";
import { AuthContext } from "../../context/AuthContext.js";
import axios from "axios";
import Sidebar from "../shared/Sidebar";
import PotentialChats from "../chats/PotentialChats";
import Profile from "../settings/Profile";
import PopUp from "./PopUp.js";

function Settings() {
    const { user } = useContext(AuthContext);
    const userId = user._id;
    const [showProfile, setShowProfile] = useState();
    const [showStatus, setShowStatus] = useState();
    const [showAbout, setShowAbout] = useState();
    const [activeSection, setActiveSection] = useState("settings");
    const [passwordPopUp, setPasswordPopUp] = useState(false);
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
                // console.log("!!!!!!res", res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userId]);

    return (
        <div>
            {/* <Sidebar setActiveSection={setActiveSection} />
            {activeSection === "friends" && <PotentialChats />}
            {activeSection === "profile" && <Profile userProfile={user} />} */}

            <h2>Settings</h2>
            <div>
                <ToggleSwitch
                    label="Profile"
                    userId={user ? user._id : null}
                    status={showProfile !== undefined ? showProfile : false}
                />
                <ToggleSwitch
                    label="Status"
                    userId={user ? user._id : null}
                    status={showStatus !== undefined ? showStatus : false}
                />
                <ToggleSwitch
                    label="About"
                    userId={user ? user._id : null}
                    status={showAbout !== undefined ? showAbout : false}
                />
                <p>changePassword</p>
                <button onClick={() => setPasswordPopUp(true)}>
                    edit password
                </button>
                <PopUp
                    userId={userId}
                    trigger={passwordPopUp}
                    setTrigger={setPasswordPopUp}
                />
            </div>
        </div>
    );
}

export default Settings;
