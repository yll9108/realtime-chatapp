import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = styled.div`
  background-color: black;
  padding: 0.5em 2em;
  color: White;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.div`
  display: flex;
`;
const Stack = styled.div`
  display: flex;
  gap: 3em;
`;
const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5em 1em;
  font-size: 1em;

  &:hover {
    text-decoration: underline;
  }
`;
const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <Navbar>
      <Container>
        <h2>
          <Link to="/" className="chatApp">
            ChatApp
          </Link>
        </h2>
        {user ? (
          <>
            <span className="login-UserName">Logged in as {user.name}</span>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <Nav>
            <Stack>
              <Link to="/login" className="login">
                Login
              </Link>
              <Link to="/register" className="register">
                Register
              </Link>
            </Stack>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
