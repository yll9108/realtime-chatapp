import { useState } from "react";
import { Form } from "react-bootstrap";

export default function ToggleSwitch({ label }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => setIsChecked(!isChecked);

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
