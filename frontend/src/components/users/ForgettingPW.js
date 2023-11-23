import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgettingPW() {
    const [resetMailError, setResetMailError] = useState(null);
    const [email, setEmail] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/api/users/reset", {
                email,
            })
            .then((res) => {
                console.log(res);
                if (res.data.code === 404) {
                    console.log(`MSG from frontend: email hasn't signed up`);
                    setResetMailError("Can not find user.");
                } else if (res.status === 200) {
                    console.log(`MSG from frontend: Succeed`);
                    navigate("/");
                }
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
                    <p>{resetMailError}</p>
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
