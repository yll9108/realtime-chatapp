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
        <div
            className="container NavBar"
            style={{ borderBottom: "1px solid lightseagreen" }}
        >
            <div className="row">
                <h2 className="col-6">
                    <Link to="/" className="chatApp">
                        ChatApp
                    </Link>
                </h2>
                {user ? (
                    <>
                        <span className="login-UserName">
                            Logged in as {user?.name}
                        </span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <div className="col-6 d-flex justify-content-end">
                        <Link to="/login" className="login">
                            Login
                        </Link>

                        <Link to="/register" className="register">
                            Register
                        </Link>
                        {/* </div> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
