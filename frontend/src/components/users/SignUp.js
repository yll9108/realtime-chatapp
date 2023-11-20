// import styled from "styled-components";
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
            <div className="container">
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card py-3 px-2">
                            <h1 className="text-center mb-3 mt-2">Register</h1>
                            <form className="myform" onSubmit={registerUser}>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="userName"
                                        placeholder="Username"
                                        onChange={(e) =>
                                            updateRegisterInfo({
                                                ...registerInfo,
                                                userName: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={(e) =>
                                            updateRegisterInfo({
                                                ...registerInfo,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Password ( 6 to 10 characters)"
                                        onChange={(e) =>
                                            updateRegisterInfo({
                                                ...registerInfo,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group mt-3 d-grid gap-2">
                                    <button className="btn btn-block btn-primary btn-lg text-dark">
                                        {isRegisterLoading
                                            ? "Creating your account"
                                            : "Register"}
                                    </button>
                                </div>
                                <div>
                                    <p className="errorText">{registerError}</p>
                                </div>
                            </form>
                            {/* <ol>
                                Password rules: */}
                            {/* <ul>Length: Between 6 and 10 characters.</ul> */}
                            <ul>
                                Must include both uppercase and lowercase
                                letters, special symbols and numbers.
                            </ul>
                            <ul>
                                Allowed
                                symbols:`~!@#$%^&*()_+=,&lt;&gt;-&#123;&#125;[]:;.'"?|
                            </ul>
                            {/* </ol> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// const SignUpDiv = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `;
// const Stack = styled.div`
//     display: flex;
// `;
// const Alert = styled.div`
//     display: flex;
//     color: black;
// `;
export default SignUp;
