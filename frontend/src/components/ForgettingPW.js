import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgettingPW() {
    const [email, setEmail] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/api/users/reset", {
                email,
            })
            .then((result) => {
                console.log(result);
                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <ForgettingPWDiv>
                <h1>Forgot Password?</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <strong>Email</strong>
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="type in email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button>Sumbit</button>
                </form>
            </ForgettingPWDiv>
        </>
    );
}

const ForgettingPWDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default ForgettingPW;
