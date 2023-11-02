import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/api/users/register", {
                userName,
                email,
                password,
            })
            .then((res) => {
                if (res.data.Status === "Success") {
                    navigate("/");
                } else if (res.data.Status === "missing") {
                    console.log(
                        `MSG from frontend: missing one of them: userName, email or password`
                    );
                } else if (res.data.Status === "duplicate user") {
                    console.log(`MSG from frontend: user already exists`);
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <SignUpDiv>
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <strong>Username</strong>
                    </label>
                    <input
                        type="text"
                        name="userName"
                        placeholder="Enter userName"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <label>
                        <strong>Email</strong>
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="type in email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>
                        <strong>Password</strong>
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="type in password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button>Sign Up</button>
                </form>
            </SignUpDiv>
        </>
    );
}

const SignUpDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default SignUp;
