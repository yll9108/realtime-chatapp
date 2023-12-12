import React, { useContext, useState, useEffect  } from "react";
import { AuthContext } from "../../context/AuthContext";
import PopUp from "./PopUp"; // Ensure the path to PopUp is correct
import { Container, Button, Stack } from "react-bootstrap";

function AccountSettings({ setShowAccountSettings }) {
    const { user, deleteAccount } = useContext(AuthContext);
    const [passwordPopUp, setPasswordPopUp] = useState(false);
    const [showEditAndDeleteButton, setShowEditAndDeleteButton] =
        useState(true);
        const [isGoogleUser, setIsGoogleUser] = useState(false);

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
    useEffect(() => {
        if (user) {
            setIsGoogleUser(user.isGoogleAccount);
        }
    }, [user]);
    return (
        <Container>
            <Stack gap={2} className="col-md-20 mx-auto align-items-center">
                <button
                    style={backButtonStyle}
                    onClick={() => setShowAccountSettings(false)}
                >
                    <i className="bi bi-arrow-left"></i> Back to Settings
                </button>
                {!user.isGoogleAccount && (
    <Button
        variant="primary"
        onClick={() => {
            setPasswordPopUp(true);
            setShowEditAndDeleteButton(false);
        }}
    >
        Edit Password
    </Button>
)}

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
                    <PopUp
                        userId={user._id}
                        trigger={passwordPopUp}
                        setTrigger={setPasswordPopUp}
                    />
                )}
            </Stack>
        </Container>
    );
}

export default AccountSettings;