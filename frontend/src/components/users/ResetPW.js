import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { EyeSlash, Eye } from "react-bootstrap-icons";
import {
    Alert,
    Button,
    Form,
    Row,
    Col,
    Stack,
    InputGroup,
    FormControl,
    Container,
} from "react-bootstrap";

function ResetPW() {
    const [newPassword, setNewPassword] = useState();
    const [resetPasswordError, setResetPasswordError] = useState();
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        digit: false,
        specialChar: false,
    });
    const navigate = useNavigate();
    const { resetToken } = useParams();

    const handlePasswordChange = (event) => {
        const { value } = event.target;
        setNewPassword(value);

        const passwordReqs = {
            length: value.length >= 6,
            uppercase: /[A-Z]/.test(value),
            lowercase: /[a-z]/.test(value),
            digit: /\d/.test(value),
            specialChar: /[~!@#$%^&*()_+=,{}[\]:";'?|]/.test(value),
        };

        setPasswordRequirements(passwordReqs);
    };

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(
                `https://realtime-chatapp-backend-nc9x.onrender.com/api/users/reset/${resetToken}`,
                {
                    newPassword,
                }
            )
            .then((res) => {
                console.log(res);
                if (res.data.code === 422) {
                    setResetPasswordError(false);
                } else if (res.status === 200) {
                    navigate("/");
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <Container>
            <Stack
                direction="vertically"
                className="align-items-center"
                style={{ textAlign: "center" }}
            >
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <FormControl
                            type={passwordShown ? "text" : "password"}
                            placeholder="Password"
                            onChange={handlePasswordChange}
                        />
                        <InputGroup.Text onClick={togglePasswordVisibility}>
                            {passwordShown ? <EyeSlash /> : <Eye />}
                        </InputGroup.Text>
                    </InputGroup>
                    <button
                        className="btn btn-primary mt-2"
                        type="submit"
                        style={{ width: "100%" }}
                    >
                        Submit
                    </button>
                    {resetPasswordError && (
                        <Alert variant="danger">{resetPasswordError}</Alert>
                    )}
                    <div id="password-requirements">
                        <p>Password Requirements:</p>
                        <ul>
                            <li
                                className={
                                    passwordRequirements.length
                                        ? "valid"
                                        : "invalid"
                                }
                            >
                                At least 6 characters
                            </li>
                            <li
                                className={
                                    passwordRequirements.uppercase
                                        ? "valid"
                                        : "invalid"
                                }
                            >
                                At least one uppercase letter (A-Z)
                            </li>
                            <li
                                className={
                                    passwordRequirements.lowercase
                                        ? "valid"
                                        : "invalid"
                                }
                            >
                                At least one lowercase letter (a-z)
                            </li>
                            <li
                                className={
                                    passwordRequirements.digit
                                        ? "valid"
                                        : "invalid"
                                }
                            >
                                At least one digit (0-9)
                            </li>
                            <li
                                className={
                                    passwordRequirements.specialChar
                                        ? "valid"
                                        : "invalid"
                                }
                            >
                                At least one special character
                                (~!@#$%^&amp;*()_+=,
                                {}[]:";'?|/)
                            </li>
                        </ul>
                    </div>
                </form>
            </Stack>
            <style type="text/css">
                {`
          .valid {
            color: #00bd9b;
          }
          .invalid {
            color: red;
          }
        `}
            </style>
        </Container>
    );
}

export default ResetPW;
