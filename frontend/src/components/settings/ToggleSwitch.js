import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

export default function ToggleSwitch({ label, checked, onChange, userId }) {
    console.log("UserId in ToggleSwitch:", userId);
    const [isChecked, setIsChecked] = useState(
        checked !== undefined ? checked : false
    );

    const handleToggle = (e) => {
        e.preventDefault();
        if (!userId) {
            console.error("UserId is undefined!");
            return;
        }
        setIsChecked(!isChecked);

        console.log(userId);
        if (userId)
            axios
                .post(`http://localhost:8080/api/settings/${userId}`, {
                    showProfile: label === "Profile" ? !checked : undefined,
                    showStatus: label === "Status" ? !checked : undefined,
                    showAbout: label === "About" ? !checked : undefined,
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
    };
    return (
        <Form>
            <div className="d-flex align-items-center justify-content-between">
                <label>{label}</label>
                <Form.Check
                    type="switch"
                    id={`toggle-switch${label}`}
                    label=""
                    checked={isChecked}
                    onChange={handleToggle}
                />
            </div>
        </Form>
    );
}
