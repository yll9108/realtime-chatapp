import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ResetPW() {
    const [newPassword, setNewPassword] = useState();
    const navigate = useNavigate();
    const { resetToken } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:8080/api/users/reset/${resetToken}`, {
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

export default ResetPW;
