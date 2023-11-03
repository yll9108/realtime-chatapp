import styled from "styled-components";
import { Link } from "react-router-dom";

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

const NavBar = () => {
  return (
    <>
      <Navbar>
        <Container>
          <h2>
            <Link to="/" className="chatApp">
              ChatApp
            </Link>
          </h2>
          <span className="login-UserName">Logged in as test</span>
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
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
