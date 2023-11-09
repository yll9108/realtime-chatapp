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
            // console.log(response);
            if (response.code === 400) {
                setRegisterError(
                    "missing one of them : email/username/password"
                );
            } else if (response.code === 409) {
                setRegisterError("User existed");
            } else if (response.code === 500) {
                console.log(response);
                return setRegisterError(response);
            } else if (response.code === 422) {
                setRegisterError(
                    "The provided password does not meet the minimum requirements. It must be at least 6 characters long and contain a combination of upper case letters, lower case letters, numbers, and special characters."
                );
            } else if (response.code === 200) {
                navigate("/");
            } else if (response.code === 403) {
                setRegisterError("password can't be the same as email");
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

            if (response.Status === "missing") {
                setLoginError("missing one of them : email/username/password");
            } else if (response.Status === "non existing") {
                setLoginError("user doesn't exist");
            } else if (response.Status === "Password wrong") {
                setLoginError("wrong password");
            } else if (response.error) {
                return setLoginError(response);
            } else {
                localStorage.setItem("User", JSON.stringify(response));
                setUser(response);
            }
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
