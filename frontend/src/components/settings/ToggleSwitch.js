import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

export default function ToggleSwitch({ label, userId, status }) {
    // console.log("UserId in ToggleSwitch:", userId);
    const [isChecked, setIsChecked] = useState();
    // console.log("isChecked", isChecked);
    // console.log("status", status);

    useEffect(() => {
        setIsChecked(status);
        console.log("icChecked", isChecked);
    }, [status]);

    const handleToggle = (e) => {
        if (!userId) {
            console.error("UserId is undefined!");
            return;
        }
        setIsChecked(!isChecked);
        // console.log("isChecked", !isChecked);
        axios
            .post(`http://localhost:8080/api/settings/${userId}`, {
                showProfile: label === "Profile" ? !isChecked : undefined,
                showStatus: label === "Status" ? !isChecked : undefined,
                showAbout: label === "About" ? !isChecked : undefined,
            })
            .then((res) => {
                console.log("line 40", res);
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
