import { useContext } from "react";
// import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

// const Navbar = styled.div`
//   background-color: black;
//   padding: 0.5em 2em;
//   color: White;
// `;

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Nav = styled.div`
//   display: flex;
// `;
// const Stack = styled.div`
//   display: flex;
//   gap: 3em;
// `;
// const LogoutButton = styled.button`
//   background: none;
//   border: none;
//   color: white;
//   cursor: pointer;
//   padding: 0.5em 1em;
//   font-size: 1em;

//   &:hover {
//     text-decoration: underline;
//   }
// `;
const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        <div className="container-{breakpoint} NavBar">
            <div className="row">
                <h1 className="col-6">
                    <Link to="/" className="chatApp">
                        ChatApp
                    </Link>
                </h1>
                {user ? (
                    <>
                        <span className="login-UserName">
                            Logged in as {user?.name}
                        </span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <h3>
                            <Link to="/login" className="login">
                                Login
                            </Link>
                        </h3>
                        <h3>
                            <Link to="/register" className="register">
                                Register
                            </Link>
                        </h3>
                        {/* </div> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
