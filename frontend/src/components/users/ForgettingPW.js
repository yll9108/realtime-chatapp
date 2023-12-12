import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Stack } from "react-bootstrap";

function ForgettingPW() {
    const [resetMailMsg, setResetMailMsg] = useState(null);
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
                if (res.data.code === 404 || res.status === 200) {
                    setResetMailMsg("Please check your email.");
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Container>
                <Stack
                    direction="vertically"
                    gap={2}
                    className="align-items-center"
                    style={{ textAlign: "center" }}
                >
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
                        <p>{resetMailMsg}</p>
                    </form>
                </Stack>
            </Container>
        </>
    );
}

export default ForgettingPW;
