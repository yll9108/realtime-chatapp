import React, { useContext, useState } from 'react';
import { Alert, Button, Form, Row, Col, Stack, InputGroup, FormControl } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { EyeSlash, Eye } from 'react-bootstrap-icons';

function SignUp() {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);

  // State for individual password requirements
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    updateRegisterInfo({ ...registerInfo, password: value });

    // Check password requirements
    setPasswordRequirements({
      length: value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      digit: /\d/.test(value),
      specialChar: /[~!@#$%^&*()_+=,<>?-{}[\]:;.'"?|]/.test(value),
    });
  };
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);

  return (
    <>
      <Form className="myform" onSubmit={registerUser}>
        <Row style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <Col xs={12} md={6} lg={4}>
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
              <InputGroup>
                <FormControl
                  type={passwordShown ? 'text' : 'password'}
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
                <InputGroup.Text onClick={togglePasswordVisibility}>
                  {passwordShown ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
              {registerError && (
                <Alert variant="danger">{registerError}</Alert>
              )}
              <Button variant="primary" type="submit">
                {isRegisterLoading ? 'Creating your account...' : 'Register'}
              </Button>
              <div id="password-requirements">
                <p>Password Requirements:</p>
                <ul>
                  <li className={passwordRequirements.length ? 'valid' : 'invalid'}>
                    At least 6 characters
                  </li>
                  <li className={passwordRequirements.uppercase ? 'valid' : 'invalid'}>
                    At least one uppercase letter (A-Z)
                  </li>
                  <li className={passwordRequirements.lowercase ? 'valid' : 'invalid'}>
                    At least one lowercase letter (a-z)
                  </li>
                  <li className={passwordRequirements.digit ? 'valid' : 'invalid'}>
                    At least one digit (0-9)
                  </li>
                  <li className={passwordRequirements.specialChar ? 'valid' : 'invalid'}>
                    At least one special character (~!@#$%^&amp;*()_+=,{}[]:";'?|/)
                 </li>

                </ul>
              </div>
      
            </Stack>
          </Col>
        </Row>
      </Form>
      <style type="text/css">
        {`
          .valid {
            color: green;
          }
          .invalid {
            color: red;
          }
        `}
      </style>
    </>
  );
}

export default SignUp;
