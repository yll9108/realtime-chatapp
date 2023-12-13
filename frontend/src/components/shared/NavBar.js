import { Container, Nav, Navbar, Stack, Image } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Notification from "../chats/Notification";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar className="mb-4 NavBar" style={{ height: "3.75rem" }}>
      <Container>
        <div className="Nav-title-responsive">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </div>
        <div className="Nav-title">
          <img className="col-1" src="chatAppRevised.png" alt="logo" />
          <h1 className="">
            <Link to="/" className="chatApp link-light text-decoration-none">
              ChatApp
            </Link>
          </h1>
        </div>

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
