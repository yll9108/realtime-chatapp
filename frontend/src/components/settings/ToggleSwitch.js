import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

export default function ToggleSwitch({ label, checked, onChange }) {
    const [userId, setUserId] = useState("");
    const [isChecked, setIsChecked] = useState(
        checked !== undefined ? checked : false
    );

    useEffect(() => {
        // 假設這是從後端獲取使用者 ID 的地方
        const fetchedUserId = "6553db67aeca11f2e9463dd3";
        setUserId(fetchedUserId);
    }, []); // 這個效果只在組件渲染時執行一次

    const handleToggle = (e) => {
        e.preventDefault();
        setIsChecked(!isChecked);

        const checkedValue = checked !== undefined ? checked : false;
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
