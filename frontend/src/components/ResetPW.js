import { useState } from "react";
// import styled from "styled-components";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPW() {
    const [newPassword, setNewPassword] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const resetToken = location.pathname.split("/").pop();
        axios
            .post(`http://localhost:8080/api/users/${resetToken}`, {
                newPassword,
            })
            .then((result) => {
                console.log(result);
                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <strong>New Password</strong>
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="enter new password"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button>Sumbit</button>
                </form>
            </div>
        </>
    );
}

// const ForgettingPWDiv = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `;

export default ResetPW;
