import { createContext, useState, useCallback, useEffect } from "react";
import { baseUrl, postRequest } from "../utils/services";
import axios from "axios";
import { auth, googleAuthProvider } from "../utils/fireBaseConfig";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

      if (response.error) {
        console.log(response);
        return setRegisterError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [registerInfo]
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
        console.log('Google Auth User:', user);
        axios.post("http://localhost:8080/api/users/google-login", {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
        .then((response) => {
          console.log('Server Response:', response.data);
    setUser(response.data); 
    if (response.data.isNewUser) {
      showCustomPopup("Account created! Welcome to ChatApp.");
    }
    navigate('/home');
        })
        .catch((error) => {
          console.error('Error during Google sign-in:', error.response || error);
        });
      })
      .catch((error) => {
        console.error('Error during Google auth:', error.message);
      });
  }, [navigate, showCustomPopup]); 
  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
    auth.signOut();
  }, []);

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
