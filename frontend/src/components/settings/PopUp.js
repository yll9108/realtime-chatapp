import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Container,
    Alert,
    Button,
    Form,
    Row,
    Col,
    Stack,
} from "react-bootstrap";

export default function PopUp({ userId, trigger, setTrigger }) {
    const [newPassword, setNewPassword] = useState();
    const [changePasswordError, setChangePasswordError] = useState();
    // const navigate = useNavigate();
    console.log("newPassword", newPassword);

    const handleChangePassword = (e) => {
        e.preventDefault();
        axios
            .post(
                `http://localhost:8080/api/settings/${userId}/changepassword`,
                {
                    password: newPassword,
                }
            )
            .then((res) => {
                console.log(res);
                if (res.data.code === 422) {
                    setChangePasswordError(
                        "The provided password does not meet the minimum requirements. It must be at least 6 characters long and contain a combination of upper case letters, lower case letters, numbers, and special characters."
                    );
                } else if (res.data.code === 401) {
                    setChangePasswordError(
                        "It's a google account, you can't change it."
                    );
                } else if (res.status === 200) {
                    alert("Password changed successfully!");
                    setTrigger(false);
                }
            })
            .catch((err) => console.log(err));
    };

    return trigger ? (
        // <Stack className="card text-white bg-danger mb-3">
        <Container>
            <Stack className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                    Change Password
                </label>
                {/* <div className="card-body"> */}
                <form className="mb-3" onSubmit={handleChangePassword}>
                    <input
                        type="password"
                        placeholder="new password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="form-control mb-2"
                    />
                    <Stack direction="vertically" gap={2}>
                        <Button className="btn btn-primary" type="submit">
                            Submit
                        </Button>
                        <Button
                            className="btn btn-primary mb-2"
                            onClick={() => {
                                setTrigger(false);
                                setChangePasswordError();
                            }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                    <Stack
                        direction="vertically"
                        gap={2}
                        className="align-items-start"
                    >
                        {changePasswordError && (
                            <Alert
                                variant="danger"
                                className="d-flex align-items-center mt-2"
                            >
                                <p>{changePasswordError}</p>
                            </Alert>
                        )}
                    </Stack>
                </form>
                {/* </div> */}
            </Stack>
        </Container>
    ) : (
        ""
    );
}
