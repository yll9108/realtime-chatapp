import React, { useContext, useState } from "react";
import { Container, Button, Stack, Form } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

function AccountSettings({ setShowAccountSettings }) {
    const { user, deleteAccount } = useContext(AuthContext);
    const [passwordPopUp, setPasswordPopUp] = useState(false);
    const [showEditAndDeleteButton, setShowEditAndDeleteButton] = useState(true);

    // State for individual password requirements (similar to SignUp)
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        digit: false,
        specialChar: false,
    });

    // Similar to handlePasswordChange in SignUp
    const handlePasswordChange = (event) => {
        const { value } = event.target;

        setPasswordRequirements({
            length: value.length >= 6,
            uppercase: /[A-Z]/.test(value),
            lowercase: /[a-z]/.test(value),
            digit: /\d/.test(value),
            specialChar: /[~!@#$%^&*()_+=,{}[\]:";'?|]/.test(value),
        });
    };


    const backButtonStyle = {
        background: "none",
        color: "inherit",
        border: "none",
        padding: "0",
        font: "inherit",
        cursor: "pointer",
        outline: "inherit",
        display: "flex",
        alignItems: "center",
    };

    return (
        <Container>
            <Stack gap={2} className="col-md-20 mx-auto align-items-center">
                <button
                    style={backButtonStyle}
                    onClick={() => setShowAccountSettings(false)}
                >
                    <i className="bi bi-arrow-left"></i> Back to Settings
                </button>

                <Button
                    variant="primary"
                    onClick={() => {
                        setPasswordPopUp(true);
                        setShowEditAndDeleteButton(false);
                    }}
                    style={{
                        display: showEditAndDeleteButton ? "block" : "none",
                    }}
                >
                    Edit Password
                </Button>
                <Button
                    variant="danger"
                    onClick={() => deleteAccount(user._id)}
                    style={{
                        display: showEditAndDeleteButton ? "block" : "none",
                    }}
                >
                    Delete Account
                </Button>
                {passwordPopUp && (
                    <>
                        <Form.Control
                            type="password"
                            placeholder="New Password"
                            onChange={handlePasswordChange}
                        />
                        <div id="password-requirements">
                            <p>Password Requirements:</p>
                            <ul>
                                <li className={passwordRequirements.length ? 'valid' : 'invalid'}>
                                    At least 6 characters
                                </li>
                                <li className={passwordRequirements.uppercase ? 'valid' : 'invalid'}>
                                    At least one uppercase letter (A-Z)
                                </li>
                                <li className={passwordRequirements.lowercase ? 'valid' : 'invalid'}>
                                    At least one lowercase letter (a-z)
                                </li>
                                <li className={passwordRequirements.digit ? 'valid' : 'invalid'}>
                                    At least one digit (0-9)
                                </li>
                                <li className={passwordRequirements.specialChar ? 'valid' : 'invalid'}>
                                    At least one special character (~!@#$%^&*()_+=,{}[]:";'?|/)
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </Stack>
            <style type="text/css">
        {`
          .valid {
            color: green;
          }
          .invalid {
            color: red;
          }
        `}
      </style>
        </Container>
    );
}

export default AccountSettings;