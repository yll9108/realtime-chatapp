import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

function Login({ handleLogin }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/api/users/login", {
                email,
                password,
            })
            .then((result) => {
                console.log("Logged in successfully", result);
                // navigate("/");
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
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <label>
                    <strong>Password</strong>
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="type in password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button onClick={handleLogin}>Login</button>
            </form>
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
