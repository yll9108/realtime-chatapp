import React, { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";
import "../../css/users.css";

function Login() {
    const {
        loginUser,
        updateLoginInfo,
        loginInfo,
        loginError,
        isLoginLoading,
        signInWithGoogle,
    } = useContext(AuthContext);

    return (
        <>
            <Form className="myform" onSubmit={loginUser}>
                <Row
                    style={{
                        height: "100vh",
                        justifyContent: "center",
                        paddingTop: "10%",
                    }}
                >
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2>LOGIN</h2>
                            <Form.Control
                                className="form-control"
                                type="email"
                                placeholder="Email"
                                onChange={(e) =>
                                    updateLoginInfo({
                                        ...loginInfo,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <Form.Control
                                className="form-control"
                                type="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    updateLoginInfo({
                                        ...loginInfo,
                                        password: e.target.value,
                                    })
                                }
                            />
                            {loginError && (
                                <Alert variant="danger">
                                    <p> {loginError}</p>
                                </Alert>
                            )}

                            <Button variant="primary" type="submit">
                                {isLoginLoading
                                    ? "Login processing.."
                                    : "Login"}
                            </Button>
                            <Button onClick={signInWithGoogle}>
                                Login/Signup with Google
                            </Button>

                            <Row>
                                <div className="col-md-6 col-12">
                                    <p>Forgot password?</p>
                                </div>
                                <div className="col-md-6 col-12 d-flex justify-content-end">
                                    <Link
                                        to="/forgot-password"
                                        className="link-light text-decoration-none"
                                    >
                                        Reset
                                    </Link>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-md-6 col-12">
                                    <p>Don't have an account?</p>
                                </div>
                                <div className="col-md-6 col-12 d-flex justify-content-end">
                                    <Link
                                        to="/register"
                                        className="link-light text-decoration-none"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </Row>
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default Login;
