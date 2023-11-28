import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Notification from "../chats/Notification";

const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <Navbar className="mb-4 NavBar" style={{ height: "3.75rem" }}>
            <Container>
                <h1 className="col-3">
                    <Link
                        to="/"
                        className="chatApp link-light text-decoration-none"
                    >
                        ChatApp
                    </Link>
                </h1>
                {user && (
                    <span className="login-UserName text-warning">
                        Logged in as {user?.userName}
                    </span>
                )}

                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        {user ? (
                            <>
                                <Notification />
                                <h3>
                                    <Link
                                        onClick={() => logoutUser()}
                                        to="/"
                                        className="logout link-light text-decoration-none"
                                    >
                                        Logout
                                    </Link>
                                </h3>
                            </>
                        ) : (
                            <>
                                <h3>
                                    <Link
                                        to="/login"
                                        className="login link-light text-decoration-none"
                                    >
                                        Login
                                    </Link>
                                </h3>
                                <h3>
                                    <Link
                                        to="/register"
                                        className="register link-light text-decoration-none"
                                    >
                                        Register
                                    </Link>
                                </h3>
                            </>
                        )}
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
