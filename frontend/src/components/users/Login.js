import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, googleAuthProvider } from "../../fireBaseConfig";

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider)
      .then((result) => {
        const user = result.user;
        // Send the user data to your backend
        axios.post('http://localhost:8080/api/users/google-login', {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
        .then(response => {
          // Handle the response from your backend
          handleLogin(response.data.user);
          navigate('/'); // Navigate to the home page or dashboard
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/users/login", {
        email,
        password,
      })
      .then((result) => {
        console.log("Logged in successfully", result);
        handleLogin(result.data.user);
        navigate('/'); // Navigate to the home page or dashboard
      })
      .catch((err) => console.log(err));
  };

  return (
    <LoginDiv>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>Email</strong>
        </label>
        <input
          type="email"
          name="email"
          placeholder="type in email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>
          <strong>Password</strong>
        </label>
        <input
          type="password"
          name="password"
          placeholder="type in password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
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
