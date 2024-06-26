import { createContext, useState, useCallback, useEffect } from "react";
import { baseUrl, postRequest } from "../utils/services";
import axios from "axios";
import { auth, googleAuthProvider } from "../utils/fireBaseConfig";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        userName: "",
        email: "",
        password: "",
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const registerUser = useCallback(
        async (e) => {
            e.preventDefault();

            setIsRegisterLoading(true);
            setRegisterError(null);

            const response = await postRequest(
                `${baseUrl}/users/register`,
                JSON.stringify(registerInfo)
            );

            setIsRegisterLoading(false);

            switch (response.code) {
                case 200:
                    navigate("/");
                    break;
                case 400:
                    setRegisterError(
                        "Missing one of them : email/username/password"
                    );
                    break;
                case 403:
                    if (response.status === "PasswordEmailDuplicated") {
                        setRegisterError("Password can't be the same as email");
                    } else if (response.status === "EmailUserNameDuplicated") {
                        setRegisterError("Username can't be the same as email");
                    }
                    break;
                case 409:
                    if (response.status === "Existing User Email") {
                        setRegisterError("User Email existed");
                    } else if (response.status === "Existing User Name") {
                        setRegisterError("User Name existed");
                    }
                    break;
                case 422:
                    setRegisterError(
                        "The provided password does not meet the minimum requirements. It must be at least 6 characters long and contain a combination of upper case letters, lower case letters, numbers, and special characters."
                    );
                    break;
                case 500:
                    // console.log(response);
                    return setRegisterError(response);
                default:
                    console.log("Unknown response code: " + response.code);
                    break;
            }
        },

        [registerInfo, navigate]
    );

    const loginUser = useCallback(
        async (e) => {
            e.preventDefault();
            setIsLoginLoading(true);
            setLoginError(null);

            const response = await postRequest(
                `${baseUrl}/users/login`,
                JSON.stringify(loginInfo)
            );
            setIsLoginLoading(false);

            switch (response.code) {
                case 200:
                    localStorage.setItem("User", JSON.stringify(response));
                    setUser(response);
                    navigate("/");
                    break;
                case 400:
                    setLoginError("Missing one of them : email/password");
                    break;
                case 401:
                    setLoginError("Wrong password");
                    break;
                case 404:
                    setLoginError("User doesn't exist");
                    break;
                case 500:
                    setLoginError(response);
                    break;
                default:
                    console.log("Unknown response code: " + response.code);
                    break;
            }
        },
        [loginInfo]
    );
    const showCustomPopup = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    const signInWithGoogle = useCallback(() => {
        auth.signInWithPopup(googleAuthProvider)
            .then((result) => {
                const { user } = result;
                // console.log("Google Auth User:", user);
                axios
                    .post(
                        "https://realtime-chatapp-backend-nc9x.onrender.com/api/users/google-login",
                        {
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                            isGoogleAccount: true,
                        }
                    )
                    .then((response) => {
                        // console.log("Server Response:", response.data);
                        const userData = {
                            ...response.data,
                            isGoogleAccount: true,
                        };
                        localStorage.setItem("User", JSON.stringify(userData));
                        setUser(userData);
                        if (user.data.isNewUser) {
                            showCustomPopup("Welcome to ChatApp.");
                        }
                        navigate("/home");
                    })
                    .catch((error) => {
                        console.error(
                            "Error during Google sign-in:",
                            error.response || error
                        );
                    });
            })
            .catch((error) => {
                console.error("Error during Google auth:", error.message);
            });
    }, [navigate, showCustomPopup]);
    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
        auth.signOut();
    }, []);
    const updateUser = useCallback((updatedUserData) => {
        localStorage.setItem("User", JSON.stringify(updatedUserData.user));

        setUser(updatedUserData.user);

        if (updatedUserData.emailChangeAttempted) {
            alert("Email update is not allowed for Google account users.");
        }

        if (updatedUserData.user.profilePictureUrl) {
            localStorage.setItem(
                "profilePictureUrl",
                updatedUserData.user.profilePictureUrl
            );
        }
    }, []);
    const deleteAccount = async () => {
        if (
            window.confirm(
                "Are you sure you want to delete your account? This cannot be undone."
            )
        ) {
            try {
                await axios.delete(
                    `https://realtime-chatapp-backend-nc9x.onrender.com/api/users/delete/${user._id}`
                );
                logoutUser();
                navigate("/login");
            } catch (error) {
                console.error("Error deleting account:", error);
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                updateRegisterInfo,
                registerUser,
                registerInfo,
                registerError,
                isRegisterLoading,
                loginUser,
                updateLoginInfo,
                loginInfo,
                loginError,
                isLoginLoading,
                signInWithGoogle,
                logoutUser,
                updateUser,
                deleteAccount,
            }}
        >
            {showPopup && <Popup>{popupMessage}</Popup>}
            {children}
        </AuthContext.Provider>
    );
};
const Popup = styled.div`
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
`;
