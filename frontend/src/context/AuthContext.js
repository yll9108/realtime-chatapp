import { createContext, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/services";

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

  console.log("registerInfo", registerInfo);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  //the function originally in the SingUp.js
  //name : handleSubmit => registerUser
  const navigate = useNavigate();
  const registerUser = (e) => {
    e.preventDefault();

    setIsRegisterLoading(true);
    setRegisterError(null);

    axios
      .post(`${baseUrl}/users/register`, registerInfo)
      .then((res) => {
        const response = res.data.Status;

        setIsRegisterLoading(false);

        if (response === "Success") {
          setUser(response);
          navigate("/");
          console.log(response);
        } else if (response === "missing") {
          setRegisterError(response.toString());

          console.log(
            `MSG from frontend: missing one of them: userName, email or password`
          );
        } else if (response === "duplicate user") {
          setRegisterError(response.toString());

          console.log(`MSG from frontend: user already exists`);
        }
      })
      .catch((err) => {
        setRegisterError(err);
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
