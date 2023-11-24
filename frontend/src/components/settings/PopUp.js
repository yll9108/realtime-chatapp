import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        <div className="card">
            <div className="card-header">Change Password</div>
            <div className="card-body">
                <h5 className="card-title">This part will show user email</h5>
                <form onSubmit={handleChangePassword}>
                    <input
                        type="password"
                        placeholder="newPassword"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                    <br></br>
                    <button
                        className="btn btn-primary"
                        onClick={() => setTrigger(false)}
                    >
                        cancel
                    </button>
                    <p>{changePasswordError}</p>
                </form>
            </div>
        </div>
    ) : (
        ""
    );
}
