import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { auth, googleAuthProvider } from './../fireBaseConfig';

function Login({ handleLogin }) {
  const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider)
        .then((result) => {
            // Successful login
            handleLogin();
        })
        .catch((error) => {
            console.error(error.message);
        });
};

return (
  <LoginDiv>
      <h1>LOGIN</h1>
      <input type="email" name="email" placeholder="type in email" />
      <input type="password" name="password" placeholder="type in password" />
      <button onClick={handleLogin}>Login</button>
      <button onClick={signInWithGoogle}>Login/Signup with Google</button>
      <p>Forgot password?</p>
      <Link to="/forgot-password">Reset</Link>
      <h3>Don't have an account?</h3>
      <Link to="/signup">Sign up</Link>
  </LoginDiv>
);
}

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Login;