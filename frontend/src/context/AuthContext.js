import { createContext, useState, useCallback, useEffect } from "react";
import { baseUrl, postRequest } from "../utils/services";
import axios from "axios";
import { auth, googleAuthProvider } from "../utils/fireBaseConfig";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
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
    // console.log("registerInfo", registerInfo);
    // console.log("loginInfo", loginInfo);
    // console.log("user", user);
    // const navigate = useNavigate();

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
    //SingUp.js handleSubmit
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

            if (response.Status === "duplicate user") {
                setRegisterError("User existed");
            } else if (response.Status === "missing") {
                setRegisterError(
                    "missing one of them : email/username/password"
                );
            } else if (response.error) {
                console.log(response);
                return setRegisterError(response);
            } else {
                navigate("/");
            }

            // it's better to save user after logged in
            // localStorage.setItem("User", JSON.stringify(response));
            // setUser(response);
        },
        [registerInfo, navigate]
    );

    //Login.js handleSubmit
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

            if (response.error) {
                return setLoginError(response);
            }
            localStorage.setItem("User", JSON.stringify(response));
            setUser(response);
        },
        [loginInfo]
    );

    const signInWithGoogle = () => {
        auth.signInWithPopup(googleAuthProvider)
            .then((result) => {
                const user = result.user;
                axios
                    .post("http://localhost:8080/api/users/google-login", {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                    })
                    .then((response) => {
                        setUser(response.data.user);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error.message);
            });
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
