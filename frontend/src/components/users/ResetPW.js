import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ResetPW() {
  const [newPassword, setNewPassword] = useState();
  const [resetPasswordError, setResetPasswordError] = useState();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/users/reset/${resetToken}`, {
        newPassword,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.code === 422) {
          setResetPasswordError(
            "The provided password does not meet the minimum requirements. It must be at least 6 characters long and contain a combination of upper case letters, lower case letters, numbers, and special characters."
          );
        } else if (res.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => console.log("ResetPW error -", err));
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
          <p>{resetPasswordError}</p>
        </form>
      </div>
    </>
  );
}

export default ResetPW;
