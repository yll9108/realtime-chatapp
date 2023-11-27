import React, { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";

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
                {isLoginLoading ? "Login processing.." : "Login"}
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
  //  <>
  //           { <div className="container Login">
  //               <div className="row d-flex justify-content-center mt-5">
  //                   <div className="col-12 col-md-8 col-lg-6 col-xl-5">
  //                       <div className="card py-3 px-2">
  //                           <h1 className="text-center mb-3 mt-2">LOGIN</h1>
  //                           <form className="myform" onSubmit={loginUser}>
  //                               <div className="form-group">
  //                                   <input
  //                                       className="form-control"
  //                                       type="email"
  //                                       name="email"
  //                                       placeholder="Email"
  //                                       onChange={(e) =>
  //                                           updateLoginInfo({
  //                                               ...loginInfo,
  //                                               email: e.target.value,
  //                                           })
  //                                       }
  //                                   />
  //                               </div>
  //                               <div className="form-group">
  //                                   <input
  //                                       className="form-control"
  //                                       type="password"
  //                                       name="password"
  //                                       placeholder="Password"
  //                                       onChange={(e) =>
  //                                           updateLoginInfo({
  //                                               ...loginInfo,
  //                                               password: e.target.value,
  //                                           })
  //                                       }
  //                                   />
  //                               </div>
  //                               <div className="row">
  //                                   <div className="form-group mt-3 d-grid gap-2">
  //                                       <button
  //                                           type="sumbit"
  //                                           className="btn btn-block btn-primary btn-lg text-dark"
  //                                       >
  //                                           {isLoginLoading
  //                                               ? "Login processing.."
  //                                               : "Login"}
  //                                       </button>
  //                                       <div className="form-group mt-3 d-grid gap-2">
  //                                           <button
  //                                               className="btn btn-block btn-primary btn-lg text-dark"
  //                                               onClick={signInWithGoogle}
  //                                           >
  //                                               Login/Signup with Google
  //                                           </button>
  //                                       </div>
  //                                       <div>
  //                                           <p className="errorText">
  //                                               {loginError}
  //                                           </p>
  //                                       </div>
  //                                       <div className="row">
  //                                           <div className="col-md-6 col-12">
  //                                               <p>Forgot password?</p>
  //                                           </div>
  //                                           <div className="col-md-6 col-12 d-flex justify-content-end">
  //                                               <Link to="/forgot-password">
  //                                                   Reset
  //                                               </Link>
  //                                           </div>
  //                                       </div>

  //                                       <div className="row">
  //                                           <div className="col-md-6 col-12">
  //                                               <p>Don't have an account?</p>
  //                                           </div>
  //                                           <div className="col-md-6 col-12 d-flex justify-content-end">
  //                                               <Link to="/register">
  //                                                   Register
  //                                               </Link>
  //                                           </div>
  //                                       </div>
  //                                   </div>
  //                               </div>
  //                           </form>
  //                       </div>
  //                   </div>
  //               </div>
  //           </div>
  //       </> }
  //   );
}

export default Login;
