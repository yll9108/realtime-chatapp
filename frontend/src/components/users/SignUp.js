import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function SignUp() {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);

  return (
    <>
      <Form className="myform" onSubmit={registerUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>REGISTER</h2>
              <Form.Control
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
              <Form.Control
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
              <Form.Control
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
              {registerError && (
                <Alert variant="danger">
                  <p> {registerError}</p>
                </Alert>
              )}
              <Button variant="primary" type="submit">
                {isRegisterLoading ? "Creating your account" : "Register"}
              </Button>
              <div>
                Must include both uppercase and lowercase letters, special
                symbols and numbers.
              </div>
              <div>
                Allowed symbols:`~!@#$%^&*()_+=,&lt;&gt;-&#123;&#125;[]:;.'"?|
              </div>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
  //       <>
  //           <div className="container">
  //               <div className="row d-flex justify-content-center mt-5">
  //                   <div className="col-12 col-md-8 col-lg-6 col-xl-5">
  //                       <div className="card py-3 px-2">
  //                           <h1 className="text-center mb-3 mt-2">Register</h1>
  //                           <form className="myform" onSubmit={registerUser}>
  //                               <div className="form-group">
  //                                   <input
  //                                       className="form-control"
  //                                       type="text"
  //                                       name="userName"
  //                                       placeholder="Username"
  //                                       onChange={(e) =>
  //                                           updateRegisterInfo({
  //                                               ...registerInfo,
  //                                               userName: e.target.value,
  //                                           })
  //                                       }
  //                                   />
  //                               </div>
  //                               <div className="form-group">
  //                                   <input
  //                                       className="form-control"
  //                                       type="email"
  //                                       name="email"
  //                                       placeholder="Email"
  //                                       onChange={(e) =>
  //                                           updateRegisterInfo({
  //                                               ...registerInfo,
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
  //                                       placeholder="Password ( 6 to 10 characters)"
  //                                       onChange={(e) =>
  //                                           updateRegisterInfo({
  //                                               ...registerInfo,
  //                                               password: e.target.value,
  //                                           })
  //                                       }
  //                                   />
  //                               </div>
  //                               <div className="form-group mt-3 d-grid gap-2">
  //                                   <button className="btn btn-block btn-primary btn-lg text-dark">
  //                                       {isRegisterLoading
  //                                           ? "Creating your account"
  //                                           : "Register"}
  //                                   </button>
  //                               </div>
  //                               <div>
  //                                   <p className="errorText">{registerError}</p>
  //                               </div>
  //                           </form>
  //                           {/* <ol>
  //                               Password rules: */}
  //                           {/* <ul>Length: Between 6 and 10 characters.</ul> */}
  //                           <ul>
  //                               Must include both uppercase and lowercase
  //                               letters, special symbols and numbers.
  //                           </ul>
  //                           <ul>
  //                               Allowed
  //                               symbols:`~!@#$%^&*()_+=,&lt;&gt;-&#123;&#125;[]:;.'"?|
  //                           </ul>
  //                           {/* </ol> */}
  //                       </div>
  //                   </div>
  //               </div>
  //           </div>
  //       </>
  //   );
}

export default SignUp;
