import React, { useContext } from "react";
// import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";

function Login({ handleLogin }) {
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();

    const {
        loginUser,
        updateLoginInfo,
        loginInfo,
        loginError,
        isLoginLoading,
        signInWithGoogle,
    } = useContext(AuthContext);

    return (
        // <LoginDiv>
        <>
            <div class="container">
                <div class="row d-flex justify-content-center mt-5">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card py-3 px-2">
                            <h1 class="text-center mb-3 mt-2">LOGIN</h1>
                            <form class="myform" onSubmit={loginUser}>
                                <div class="form-group">
                                    <input
                                        class="form-control"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={(e) =>
                                            updateLoginInfo({
                                                ...loginInfo,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div class="form-group">
                                    <input
                                        class="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(e) =>
                                            updateLoginInfo({
                                                ...loginInfo,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div class="row">
                                    <div class="form-group mt-3 d-grid gap-2">
                                        <button
                                            type="button"
                                            class="btn btn-block btn-primary btn-lg"
                                        >
                                            {isLoginLoading
                                                ? "Login processing.."
                                                : "Login"}
                                        </button>
                                        <div class="form-group mt-3 d-grid gap-2">
                                            <button
                                                class="btn btn-block btn-primary btn-lg"
                                                onClick={signInWithGoogle}
                                            >
                                                Login/Signup with Google
                                            </button>
                                        </div>
                                        <div>
                                            <p>{loginError}</p>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 col-12">
                                                <p>Forgot password?</p>
                                            </div>
                                            <div class="col-md-6 col-12 d-flex justify-content-end">
                                                <Link to="/forgot-password">
                                                    Reset
                                                </Link>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 col-12">
                                                <p>Don't have an account?</p>
                                            </div>
                                            <div class="col-md-6 col-12 d-flex justify-content-end">
                                                <Link to="/register">
                                                    Register
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// const LoginDiv = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `;
// const Stack = styled.div`
//     display: flex;
// `;
// const Alert = styled.div`
//     background-color: blue;
//     display: flex;
//     color: black;
// `;
export default Login;
