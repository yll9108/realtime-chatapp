import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function SignUp() {
    // moved to AuContext.js
    //   const [userName, setUserName] = useState();
    //   const [email, setEmail] = useState();
    //   const [password, setPassword] = useState();
    //   const navigate = useNavigate();

    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios
    //       .post("http://localhost:8080/api/users/register", {
    //   userName,
    //   email,
    //   password,
    //       })
    //       .then((res) => {
    //         if (res.data.Status === "Success") {
    //           navigate("/");
    //         } else if (res.data.Status === "missing") {
    //           console.log(
    //             `MSG from frontend: missing one of them: userName, email or password`
    //           );
    //         } else if (res.data.Status === "duplicate user") {
    //           console.log(`MSG from frontend: user already exists`);
    //         }
    //       })
    //       .catch((err) => console.log(err));
    //   };

    const {
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
    } = useContext(AuthContext);

    return (
        <>
            <SignUpDiv>
                <h1>Sign up</h1>
                <form onSubmit={registerUser}>
                    <Stack>
                        <label>
                            <strong>Username</strong>
                        </label>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Enter userName"
                            onChange={(e) =>
                                updateRegisterInfo({
                                    ...registerInfo,
                                    userName: e.target.value,
                                })
                            }
                        />
                    </Stack>
                    <Stack>
                        <label>
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="type in email"
                            onChange={(e) =>
                                updateRegisterInfo({
                                    ...registerInfo,
                                    email: e.target.value,
                                })
                            }
                        />
                    </Stack>
                    <Stack>
                        <label>
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="type in password"
                            onChange={(e) =>
                                updateRegisterInfo({
                                    ...registerInfo,
                                    password: e.target.value,
                                })
                            }
                        />
                    </Stack>
                    <button>
                        {isRegisterLoading
                            ? "Creating your account"
                            : "Register"}
                    </button>
                    <Alert>
                        <p>{registerError}</p>
                    </Alert>
                </form>
                <ol>
                    Password rules:
                    <ul>Max length: 10</ul>
                    <ul>Min length: 6</ul>
                    <ul>Needs to contain UpperCase and LowerCase</ul>
                    <ul>
                        You can have these
                        symbols:`~!@#$%^&*()_+=,&lt;&gt;-&#123;&#125;[]:;.'"?|
                    </ul>
                </ol>
            </SignUpDiv>
        </>
    );
}

const SignUpDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Stack = styled.div`
    display: flex;
`;
const Alert = styled.div`
    display: flex;
    color: black;
`;
export default SignUp;
