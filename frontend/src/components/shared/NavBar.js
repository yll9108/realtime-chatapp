import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <div className="container-{breakpoint} NavBar">
      <div className="NacBar Content">
        <div className="row">
          <h1 className="col-6">
            <Link to="/" className="chatApp">
              ChatApp
            </Link>
          </h1>
          {user ? (
            <>
              <span className="login-UserName">Logged in as {user?.userName}</span>
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
    </div>
  );
};

export default NavBar;
