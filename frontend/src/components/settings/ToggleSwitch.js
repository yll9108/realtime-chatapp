import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

export default function ToggleSwitch({ label, userId, status }) {
    // console.log("UserId in ToggleSwitch:", userId);
    // console.warn(status);
    const [isChecked, setIsChecked] = useState(status);
    // console.log("isChecked", isChecked);
    // console.log("status", status);

    useEffect(() => {
        if (status !== undefined) setIsChecked(status);
    }, [status]);

    useEffect(() => {
        // console.log("icChecked", isChecked);
    }, [isChecked]);

    const handleToggle = (e) => {
        if (!userId) {
            console.error("UserId is undefined!");
            return;
        } else {
            if (e.target.checked) {
                // console.log("checked");
                setIsChecked(true);
            } else {
                // console.log("unchecked");
                setIsChecked(false);
            }
            axios
                .post(`http://localhost:8080/api/settings/${userId}`, {
                    showProfile:
                        label === "Profile" ? e.target.checked : undefined,
                    showStatus:
                        label === "Status" ? e.target.checked : undefined,
                    showAbout: label === "About" ? e.target.checked : undefined,
                })
                .then((res) => {
                    // console.log("line 40", res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // setIsChecked(!isChecked);

        // console.log("isChecked", !isChecked);
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
